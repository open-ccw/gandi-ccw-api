import type VirtualMachine from "@open-ccw/scratch-vm";
import { communityWeb, setRequestUtils } from "@ccw-api/api";
import { requestUtils } from "@ccw-api/request";
setRequestUtils(requestUtils);

export interface UserInfo {
  userId?: string;
  userName: string;
  uuid: string;
  oid: string;
  avatar: string;
  constellation: number;
  following: number;
  followers: number;
  liked: number;
  gender: number; // 0: male
  pendant: string;
  reputationScore?: {
    rank?: string;
    score: number;
    studentOid?: string;
  };
}

export interface CCWApiController {
  preloadUserInfo(oid: string): Promise<UserInfo>;
  clearUserInfoCache(): void;
}

export function setCCWApi(vm: VirtualMachine): CCWApiController {
  let userInfoCache: UserInfo | null = null;
  let userInfoPromise: Promise<UserInfo> | null = null;

  /**
   * 拉取并组装用户信息。
   * 若传入已知 oid,则跳过 getStudentSelfDetail,只请求 getCreationStudentDetail,减少一次网络请求。
   */
  async function fetchUserInfo(knownOid?: string): Promise<UserInfo> {
    let oid = knownOid;
    let selfDetail: any = null;

    if (!oid) {
      selfDetail = await communityWeb.getStudentSelfDetail(false, false, []);
      oid = selfDetail.oid;
    }

    const student = await communityWeb.getCreationStudentDetail(oid!);
    const {
      name,
      avatar,
      oid: studentOid,
      virtualValue: studentVirtualValue,
    } = student;

    return {
      userName: selfDetail?.name ?? name,
      avatar: selfDetail?.avatar ?? avatar,
      oid: studentOid ?? oid,
      uuid: studentOid ?? oid,
      userId: selfDetail?.studentNumber,
      gender: 0,
      constellation: 0,
      liked: student.likeCount,
      followers: student.followerCount,
      following: student.followingCount,
      pendant: selfDetail?.virtualValue ?? studentVirtualValue,
      reputationScore: selfDetail?.reputationScore,
    };
  }

  /** 懒加载 + 缓存:首次调用发起请求,后续直接命中缓存;并发调用共用同一 Promise。 */
  function getUserInfoCached(knownOid?: string): Promise<UserInfo> {
    if (userInfoCache) return Promise.resolve(userInfoCache);
    if (!userInfoPromise) {
      userInfoPromise = fetchUserInfo(knownOid)
        .then((info) => {
          userInfoCache = info;
          return info;
        })
        .finally(() => {
          userInfoPromise = null;
        });
    }
    return userInfoPromise;
  }

  const controller: CCWApiController = {
    /**
     * 外部手动传入 oid,提前加载并缓存用户信息。
     * 由于 oid 已知,可跳过 getStudentSelfDetail,仅需一次 getCreationStudentDetail 请求。
     */
    preloadUserInfo(oid: string): Promise<UserInfo> {
      return getUserInfoCached(oid);
    },
    clearUserInfoCache(): void {
      userInfoCache = null;
      userInfoPromise = null;
    },
  };

  vm.setCCWAPI({
    getCoinCount(): Promise<number> {
      throw new Error("Function not implemented.");
    },
    getOpenVM(): Partial<VirtualMachine> {
      return { runtime: vm.runtime };
    },
    async getOnlineExtensionsConfig(): Promise<any> {
      throw new Error("Function not implemented.");
    },
    getExtensionURLById(id: string): Promise<string> {
      throw new Error("Function not implemented.");
    },
    commentWithStageSnapshot(): Promise<any> {
      throw new Error("Function not implemented.");
    },
    getDeviceType(): Promise<"PC"> {
      return Promise.resolve("PC");
    },
    getProjectDonateRanking(): void {
      throw new Error("Function not implemented.");
    },
    getProjectSb3Id(): string {
      throw new Error("Function not implemented.");
    },
    getProjectStats(): Promise<any> {
      throw new Error("Function not implemented.");
    },
    getProjectUUID(): void {
      throw new Error("Function not implemented.");
    },
    async getUserInfo(): Promise<UserInfo> {
      return getUserInfoCached();
    },
    isFavoriteProject(): void {
      throw new Error("Function not implemented.");
    },
    isFollowed(): Promise<boolean> {
      throw new Error("Function not implemented.");
    },
    isLiked(): Promise<boolean> {
      throw new Error("Function not implemented.");
    },
    isLikedProject(): Promise<boolean> {
      throw new Error("Function not implemented.");
    },
    isMyFans(): Promise<boolean> {
      throw new Error("Function not implemented.");
    },
    preActionInterceptor(): void {
      throw new Error("Function not implemented.");
    },
    redirect(): void {
      throw new Error("Function not implemented.");
    },
    requestCoins(): void {
      throw new Error("Function not implemented.");
    },
    requestFollow(): void {
      throw new Error("Function not implemented.");
    },
    sendPlayEventCode(): void {
      throw new Error("Function not implemented.");
    },
    setAvatar(): void {
      throw new Error("Function not implemented.");
    },
    showShare(): void {
      throw new Error("Function not implemented.");
    },
    uploadAssetToCloud(): void {
      throw new Error("Function not implemented.");
    },
  });

  return controller;
}

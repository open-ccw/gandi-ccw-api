import type VirtualMachine from "@open-ccw/scratch-vm";
import { setRequestUtils } from "@ccw-api/api";
import { requestUtils } from "@ccw-api/request";
setRequestUtils(requestUtils);

export interface ReputationScore {
  rank?: string;
  score: number;
  studentOid?: string;
}

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
  reputationScore?: ReputationScore;
}

/**
 * 外部传入的原始用户详情数据(来自 getStudentSelfDetail / getCreationStudentDetail)。
 */
export interface UserDetailData {
  selfDetail?: {
    name?: string;
    avatar?: string;
    oid?: string;
    studentNumber?: string;
    virtualValue?: string;
    gender?: string;
    constellation?: number;
    reputationScore?: ReputationScore;
  };
  creationStudent?: {
    name?: string;
    avatar?: string;
    oid?: string;
    virtualValue?: string;
    likeCount?: number;
    followerCount?: number;
    followingCount?: number;
  };
}

export interface CCWApiController {
  prepareUserInfo(data: UserDetailData): Promise<UserInfo>;
  clearUserInfoCache(): void;
}

export function setCCWApi(vm: VirtualMachine): CCWApiController {
  let userInfoCache: UserInfo | null = null;

  /** 将外部传入的原始数据组装为 UserInfo。 */
  function assembleUserInfo(data: UserDetailData): UserInfo {
    const self = data.selfDetail ?? {};
    const stu = data.creationStudent ?? {};
    const oid = self.oid ?? stu.oid ?? "";
    return {
      userName: self.name ?? stu.name ?? "",
      avatar: self.avatar ?? stu.avatar ?? "",
      oid,
      uuid: oid,
      userId: self.studentNumber,
      gender: 0,
      constellation: self.constellation ?? 0,
      liked: stu.likeCount ?? 0,
      followers: stu.followerCount ?? 0,
      following: stu.followingCount ?? 0,
      pendant: self.virtualValue ?? stu.virtualValue ?? "",
      reputationScore: self.reputationScore,
    };
  }

  /** 读取缓存的用户信息;若外部尚未提供数据则抛出错误。 */
  function getUserInfoCached(): Promise<UserInfo> {
    if (userInfoCache) return Promise.resolve(userInfoCache);
    return Promise.reject(
      new Error("User detail data has not been provided externally."),
    );
  }

  const controller: CCWApiController = {
    /**
     * 外部手动传入用户详情原始数据(oid、自我信息、创作统计数据等),
     * 组装为 UserInfo 并缓存,供后续 getUserInfo 直接读取,不再内部请求网络。
     */
    prepareUserInfo(data: UserDetailData): Promise<UserInfo> {
      const info = assembleUserInfo(data);
      userInfoCache = info;
      return Promise.resolve(info);
    },
    clearUserInfoCache(): void {
      userInfoCache = null;
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

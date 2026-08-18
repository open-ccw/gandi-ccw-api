import type VirtualMachine from "@open-ccw/scratch-vm";
import { getOnlineExtensionsConfig } from "./onlineExtCfg";

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

export function setCCWApi(
  vm: VirtualMachine,
  {
    userInfo,
    getExtUrl,
    projectOid,
  }: {
    userInfo: UserInfo;
    getExtUrl(id: string): Promise<string>;
    projectOid: string;
  },
) {
  vm.setCCWAPI({
    getCoinCount(): Promise<number> {
      throw new Error("Function not implemented.");
    },
    getOpenVM(): Partial<VirtualMachine> {
      return { runtime: vm.runtime };
    },
    getOnlineExtensionsConfig(): any {
      return getOnlineExtensionsConfig({});
    },
    getExtensionURLById(id: string): Promise<string> {
      return getExtUrl(id);
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
    getProjectUUID(): string {
      return projectOid;
    },
    async getUserInfo(): Promise<UserInfo> {
      return Promise.resolve(userInfo);
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
}

import type VirtualMachine from "@open-ccw/scratch-vm";

export function setCCWApi(vm: VirtualMachine) {
  vm.setCCWAPI({
    getCoinCount(): Promise<number> {
      throw new Error("Function not implemented.");
    },
    getOpenVM(): Partial<VirtualMachine> {
      throw new Error("Function not implemented.");
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
    getUserInfo(): void {
      throw new Error("Function not implemented.");
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

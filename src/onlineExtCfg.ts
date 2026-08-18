export function getOnlineExtensionsConfig() {
  const config = {
    fileSrc: "",
    hosts: {
      cloudDBHost: "https://community-web-cloud-database.ccw.site",
      mmoHost: "wss://mo.ccw.site",
      gandiMainHost: "https://gandi-main.ccw.site",
      translate:
        "https://community-web.ccw.site/ccw-main/external/mt/translate/",
      tts: "https://community-web.ccw.site/ccw-main/external/speech/tts/",
    },
    GandiMedia: {
      api: {
        fetchMediaVideoList() {
          throw new Error("Function not implemented.");
        },
        fetchMediaAudioList() {
          throw new Error("Function not implemented.");
        },
      },
    },
    GandiAchievementAndLeaderboard: {
      api: {
        showLeaderboard() {
          throw new Error("Function not implemented.");
        },
        insertLeaderboard() {
          throw new Error("Function not implemented.");
        },
        getUserInfoFromLeaderboard() {
          throw new Error("Function not implemented.");
        },
        getUserRankingInLeaderboard() {
          throw new Error("Function not implemented.");
        },
        showAchievementList() {
          throw new Error("Function not implemented.");
        },
        obtainAchievement() {
          throw new Error("Function not implemented.");
        },
        hasAchievement() {
          throw new Error("Function not implemented.");
        },
        hasAchievementByTemplateId() {
          throw new Error("Function not implemented.");
        },
        getAchieveList() {
          throw new Error("Function not implemented.");
        },
        updateAchievementExtra() {
          throw new Error("Function not implemented.");
        },
        getLeaderboardList() {
          throw new Error("Function not implemented.");
        },
      },
    },
    GandiAsyncAssetManager: {
      api: {
        requestSaveAndUploadSnapshot() {
          throw new Error("Function not implemented.");
        },
      },
    },
    GandiEconomy: {
      api: {
        requestExecuteSmartContract() {
          throw new Error("Function not implemented.");
        },
        getSmartContractList() {
          throw new Error("Function not implemented.");
        },
        createContractList() {
          throw new Error("Function not implemented.");
        },
        getSmartContractEarningByContractId() {
          throw new Error("Function not implemented.");
        },
        getSmartContractAccountByContractId() {
          throw new Error("Function not implemented.");
        },
        showSmartContractDetail() {
          throw new Error("Function not implemented.");
        },
        showSmartContractInjectionModal() {
          throw new Error("Function not implemented.");
        },
      },
    },
  };
  return config;
}

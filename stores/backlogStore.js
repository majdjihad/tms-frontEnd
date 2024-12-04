import { defineStore } from "pinia";
import { useBacklog } from "~/composables/useBacklog";

export const useBacklogStore = defineStore("useBacklog", () => {
  const backlogProject = ref([]);
  const sprintsProject = ref(null);
  const statusesArray = ref(null);
  const issueInfoArray = ref(null);
  const subIssueInfoArray = ref(null);
  const issueCommentArray = ref(null);
  const issueHistoryArray = ref(null);
  const subIssueCommentArray = ref(null);
  const subIssueHistoryArray = ref(null);
  const { backlog, statuses, issueDescription, issueComments, issueHistory } =
    useBacklog();

  const getBacklogProject = async (projectId) => {
    try {
      const backlogResponse = await backlog(projectId);
      backlogProject.value = [];
      for (const issue in backlogResponse?.backlog) {
        backlogProject.value.push(backlogResponse?.backlog[issue]);
      }
      sprintsProject.value = backlogResponse?.sprints;
      getStatusProject(projectId);
    } catch (error) {
      console.log(error);
      return navigateTo("/projects", { replace: false });
    }
  };

  const getStatusProject = async (projectId) => {
    try {
      const statusResponse = await statuses(projectId);
      statusesArray.value = statusResponse?.statuses;
    } catch (error) {
      console.log(error);
    }
  };

  const getIssueInfo = async (projectId, issueId) => {
    issueHistoryArray.value = [];
    try {
      const issueInfoResponse = await issueDescription(projectId, issueId);
      issueInfoArray.value = issueInfoResponse;
    } catch (error) {
      console.log(error);
    }
  };

  const getIssueComments = async (projectId, issueId) => {
    try {
      const issueCommentsResponse = await issueComments(projectId, issueId);
      issueCommentArray.value = issueCommentsResponse?.comments;
    } catch (error) {
      console.log(error);
    }
  };

  const getIssueHistory = async (projectId, issueId, pageNumber) => {
    try {
      const issueHistoryResponse = await issueHistory(
        projectId,
        issueId,
        pageNumber
      );
      issueHistoryArray.value = issueHistoryResponse?.issue_history;
    } catch (error) {
      console.log(error);
    }
  };

  const getSubIssueInfo = async (projectId, issueId) => {
    issueHistoryArray.value = [];
    try {
      const subIssueInfoResponse = await issueDescription(projectId, issueId);
      subIssueInfoArray.value = subIssueInfoResponse;
    } catch (error) {
      console.log(error);
    }
  };

  const getSubIssueComments = async (projectId, issueId) => {
    try {
      const subIssueCommentsResponse = await issueComments(projectId, issueId);
      subIssueCommentArray.value = subIssueCommentsResponse?.comments;
    } catch (error) {
      console.log(error);
    }
  };

  const getSubIssueHistory = async (projectId, issueId, pageNumber) => {
    try {
      const subIssueHistoryResponse = await issueHistory(
        projectId,
        issueId,
        pageNumber
      );
      subIssueHistoryArray.value = subIssueHistoryResponse?.issue_history;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    backlogProject,
    sprintsProject,
    statusesArray,
    issueInfoArray,
    subIssueInfoArray,
    issueCommentArray,
    issueHistoryArray,
    subIssueCommentArray,
    subIssueHistoryArray,
    getBacklogProject,
    getStatusProject,
    getIssueInfo,
    getIssueComments,
    getIssueHistory,
    getSubIssueInfo,
    getSubIssueComments,
    getSubIssueHistory,
  };
});

import { defineStore } from "pinia";
import { useBacklog } from "~/composables/useBacklog";

export const useBacklogStore = defineStore("useBacklog", () => {
  const backlogProject = ref([]);
  const sprintsProject = ref(null);
  const statusesArray = ref(null);
  const issueInfoArray = ref(null);
  const issueCommentArray = ref(null);
  const issueHistoryArray = ref(null);
  const { backlog, statuses, issueDescription, issueComments, issueHistory } =
    useBacklog();

  const getBacklogProject = async (projectId) => {
    try {
      const backlogResponse = await backlog(projectId);
      for(const issue in backlogResponse?.backlog) {
        backlogProject.value.push(backlogResponse?.backlog[issue])
      }
      sprintsProject.value = backlogResponse?.sprints;
      getStatusProject(projectId);
    } catch (error) {
      console.log(error);
      return navigateTo('/projects', {replace: false})
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
    if (issueHistoryArray.value === null) {
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
    }
  };
  return {
    backlogProject,
    sprintsProject,
    statusesArray,
    issueInfoArray,
    issueCommentArray,
    issueHistoryArray,
    getBacklogProject,
    getStatusProject,
    getIssueInfo,
    getIssueComments,
    getIssueHistory,
  };
});

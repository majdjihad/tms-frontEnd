/**
 * Backlog management composable providing functionality for managing sprints,
 * issues, labels, and comments within a project's backlog
 */
import { $larafetch } from "~/utils/$larafetch";
import { useBacklogStore } from "~/stores/backlogStore";

export const useBacklog = () => {
  const backlogStore = useBacklogStore();

  /** Fetch project backlog data including sprints and issues */
  async function backlog(projectId) {
    return await $larafetch(`api/projects/${projectId}/backlog`, {
      method: "get",
    });
  }

  /** Create a new sprint in the project and refresh backlog data */
  async function createSprint(projectId) {
    const response = await $larafetch(
      `api/projects/${projectId}/backlog/sprints/create`,
      {
        method: "post",
      }
    );
    await backlogStore?.getBacklogProject(projectId);
    return response;
  }

  /** Update sprint details and refresh backlog data */
  async function editSprint(projectId, sprintId, credentials) {
    const response = await $larafetch(
      `api/projects/${projectId}/backlog/sprints/${sprintId}/edit`,
      {
        method: "post",
        body: credentials,
      }
    );
    await backlogStore?.getBacklogProject(projectId);
    return response;
  }

  /** Delete a sprint and refresh backlog data */
  async function deleteSprint(projectId, sprintId, credentials) {
    const response = await $larafetch(
      `api/projects/${projectId}/backlog/sprints/${sprintId}/delete`,
      {
        method: "post",
        body: credentials,
      }
    );
    await backlogStore?.getBacklogProject(projectId);
    return response;
  }

  /** Create a new issue in the project */
  async function createIssue(projectId, credentials) {
    return await $larafetch(`api/projects/${projectId}/issues/create`, {
      method: "post",
      body: credentials,
    });
  }

  /** Add a label to an existing issue */
  async function createLabel(projectId, issueId, credentials) {
    return await $larafetch(
      `api/projects/${projectId}/issue/${issueId}/label/create`,
      {
        method: "post",
        body: credentials,
      }
    );
  }

  /** Move an issue to a different sprint or backlog */
  async function moveIssue(projectId, issueId, credentials) {
    return await $larafetch(
      `api/projects/${projectId}/backlog/issues/${issueId}/move`,
      {
        method: "post",
        body: credentials,
      }
    );
  }

  /** Move multiple issues in bulk */
  async function moveMultipleIssue(projectId, credentials) {
    return await $larafetch(
      `api/projects/${projectId}/backlog/bulk-issues/move`,
      {
        method: "post",
        body: credentials,
      }
    );
  }

  /** Delete a single issue */
  async function deleteIssue(projectId, issueId) {
    return await $larafetch(
      `api/projects/${projectId}/backlog/issues/${issueId}/delete`,
      {
        method: "post",
      }
    );
  }

  /** Delete multiple issues in bulk and refresh backlog data */
  async function deleteMultipleIssues(projectId, credentials) {
    const response = await $larafetch(
      `api/projects/${projectId}/backlog/bulk-issues/delete`,
      {
        method: "post",
        body: credentials,
      }
    );
    await backlogStore?.getBacklogProject(projectId);
    return response;
  }

  /** Edit multiple issues in bulk and refresh backlog data */
  async function editMultipleIssue(projectId, credentials) {
    const response = await $larafetch(
      `api/projects/${projectId}/backlog/bulk-issues/edit`,
      {
        method: "post",
        body: credentials,
      }
    );
    await backlogStore?.getBacklogProject(projectId);
    return response;
  }

  /** Get issue type information */
  async function issueType(projectId, issueId) {
    return await $larafetch(
      `api/projects/${projectId}/issues/${issueId}/type-issue`,
      {
        method: "get",
      }
    );
  }

  /** Get all available issue statuses */
  async function statuses(projectId) {
    return await $larafetch(`api/projects/${projectId}/statuses`, {
      method: "get",
    });
  }

  /** Create a new status in the project */
  async function createStatus(projectId, credentials) {
    return await $larafetch(`api/projects/${projectId}/statuses/create`, {
      method: "post",
      body: credentials,
    });
  }

  /** Update status details */
  async function editStatus(projectId, statusId, credentials) {
    return await $larafetch(
      `api/projects/${projectId}/statuses/${statusId}/edit`,
      {
        method: "post",
        body: credentials,
      }
    );
  }
  /** Move an Issue For Status */
  async function moveIssueForStatus(projectId, issueId, credentials) {
    return await $larafetch(
      `api/projects/${projectId}/board/issues/${issueId}/move`,
      {
        method: "post",
        body: credentials,
      }
    );
  }

  /** Move an status */
  async function moveStatus(projectId, statusId, credentials) {
    return await $larafetch(
      `api/projects/${projectId}/statuses/${statusId}/move`,
      {
        method: "post",
        body: credentials,
      }
    );
  }
  /** Delete a status */
  async function deleteStatus(projectId, statusId, credentials) {
    return await $larafetch(
      `api/projects/${projectId}/statuses/${statusId}/delete`,
      {
        method: "post",
        body: credentials,
      }
    );
  }

  /** Get detailed issue description */
  async function issueDescription(projectId, issueId) {
    return await $larafetch(
      `api/projects/${projectId}/backlog/issues/${issueId}/show`,
      {
        method: "get",
      }
    );
  }

  /** Get issue comments */
  async function issueComments(projectId, issueId) {
    return await $larafetch(
      `api/projects/${projectId}/backlog/issues/${issueId}/comments`,
      {
        method: "get",
      }
    );
  }

  /** Edit issue details */
  async function editIssue(projectId, issueId, credentials) {
    return await $larafetch(
      `api/projects/${projectId}/backlog/issues/${issueId}/edit`,
      {
        method: "post",
        body: credentials,
      }
    );
  }

  /** Edit issue priority */
  async function editPriority(projectId, issueId, credentials) {
    return await $larafetch(
      `api/projects/${projectId}/backlog/issues/${issueId}/edit-priority`,
      {
        method: "post",
        body: credentials,
      }
    );
  }

  /** Add a comment to an issue */
  async function addComment(projectId, issueId, credentials) {
    return await $larafetch(
      `api/projects/${projectId}/backlog/issues/${issueId}/comments/create`,
      {
        method: "post",
        body: credentials,
      }
    );
  }

  /** Edit an existing comment */
  async function editComment(projectId, issueId, commentId, credentials) {
    return await $larafetch(
      `api/projects/${projectId}/backlog/issues/${issueId}/comments/${commentId}/edit`,
      {
        method: "post",
        body: credentials,
      }
    );
  }

  /** Delete a comment */
  async function deleteComment(projectId, issueId, commentId) {
    return await $larafetch(
      `api/projects/${projectId}/backlog/issues/${issueId}/comments/${commentId}/delete`,
      {
        method: "post",
      }
    );
  }

  /** Get paginated issue history */
  async function issueHistory(projectId, issueId, pageNum) {
    return await $larafetch(
      `api/projects/${projectId}/backlog/issues/${issueId}/history/?page=${pageNum}`,
      {
        method: "get",
      }
    );
  }

  // Return all backlog management functions
  return {
    backlog,
    createSprint,
    editSprint,
    deleteSprint,
    createIssue,
    createLabel,
    moveIssue,
    moveMultipleIssue,
    deleteIssue,
    deleteMultipleIssues,
    editMultipleIssue,
    issueType,
    statuses,
    createStatus,
    editStatus,
    moveStatus,
    moveIssueForStatus,
    deleteStatus,
    issueDescription,
    issueComments,
    editIssue,
    editPriority,
    addComment,
    editComment,
    deleteComment,
    issueHistory,
  };
};

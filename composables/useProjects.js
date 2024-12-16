/**
 * Projects management composable providing functionality for project CRUD operations
 * and project-related features like favorites and archives
 */
import {$larafetch} from "~/utils/$larafetch";

export const useProjects = () => {
  /** Fetch all projects for the current user */
  async function projects() {
    return await $larafetch("/api/projects", {
      method: "get",
    });
  }

  /** Fetch important/key projects marked by the user */
  async function keyProjects() {
    return await $larafetch("/api/projects/key-projects", {
      method: "get",
    });
  }

  /** Create a new project with the provided data */
  async function createProject(credentials) {
    return await $larafetch("api/projects/create", {
      method: "post",
      body: credentials,
    });
  }

  /** Get detailed information about a specific project */
  async function detailsProject(projectId) {
    return await $larafetch(`api/projects/${projectId}/details`, {
      method: "get",
    });
  }

  /** Update project information with new data */
  async function editProject(projectId, credentials) {
    return await $larafetch(`api/projects/${projectId}/edit`, {
      method: "post",
      body: credentials,
    });
  }

  /** Toggle favorite status of a project */
  async function favoriteProject(projectId) {
    await $larafetch(`api/projects/${projectId}/favorite`, {
      method: "get",
    });
  }

  /** Move a project to archive status */
  async function archiveProject(projectId) {
    return await $larafetch(`api/projects/${projectId}/archive`, {
      method: "get",
    });
  }

  /** Fetch paginated project history/activity log */
  async function projectHistory(projectId, pageNum) {
    return await $larafetch(
        `api/projects/${projectId}/history?page=${pageNum}`,
        {
          method: "get",
        }
    );
  }

  // Return all project management functions
  return {
    projects,
    keyProjects,
    createProject,
    detailsProject,
    editProject,
    favoriteProject,
    archiveProject,
    projectHistory,
  };
};

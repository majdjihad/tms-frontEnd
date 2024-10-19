import {$larafetch} from "~/utils/$larafetch";

export const useProjects = () => {
  async function projects() {
    const response = await $larafetch("/api/projects", {
      method: "get",
    });
    return response;
  }

  async function keyProjects() {
    const response = await $larafetch("/api/projects/key-projects", {
      method: "get",
    });
    return response;
  }

  async function createProject(credentials) {
    const response = await $larafetch("api/projects/create", {
      method: "post",
      body: credentials,
    });
    return response;
  }
  
  async function detailsProject(projectId) {
      const response = await $larafetch(`api/projects/${projectId}/details`, {
          method: "get",
    });
    return response;
  }

  async function editProject(projectId, credentials) {
    const response = await $larafetch(`api/projects/${projectId}/edit`, {
      method: "post",
      body: credentials,
    });
    return response;
  }
  async  function favoriteProject(projectId) {
    await $larafetch(`api/projects/${projectId}/favorite`, {
      method: "get",
    });
    // projects()
  }
  return {
    projects,
    keyProjects,
    createProject,
    detailsProject,
    editProject,
    favoriteProject
  };
};

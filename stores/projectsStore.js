import { defineStore } from "pinia";
import { useProjects } from "~/composables/useProjects";
export const useProjectsStore = defineStore("useProjects", () => {
  const allProjects = ref(null);
  const allFavoriteProjects = ref(null);
  const allInviteProjects = ref(null);
  const allArchiveProjects = ref(null);
  const project = ref(null);
  const changeStatus = ref(true);
  async function getAllProjects() {
    const { projects } = useProjects();
    try {
      const response = await projects();
      allProjects.value = response?.projects;
      allFavoriteProjects.value = response?.FavoriteProjects;
      allInviteProjects.value = response?.inviteProjects;
      allArchiveProjects.value = response?.ArchiveProjects;
      changeStatus.value = false;
    } catch (error) {
      console.log(error);
    }
  }

  async function getProject(projectId) {
    const { detailsProject } = useProjects();
    try {
      const response = await detailsProject(projectId);
      project.value = response?.project;
    } catch (error) {
      console.log(error);
    }
  }
  return {
    allProjects,
    allFavoriteProjects,
    allInviteProjects,
    allArchiveProjects,
    changeStatus,
    project,
    getAllProjects,
    getProject,
  };
});

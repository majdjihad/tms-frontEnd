import { defineStore } from "pinia";
import { useProjects } from "~/composables/useProjects";
import { useMember } from "~/composables/useMember";
export const useProjectsStore = defineStore("useProjects", () => {
  const allProjects = ref(null);
  const allFavoriteProjects = ref(null);
  const allInviteProjects = ref(null);
  const allArchiveProjects = ref(null);
  const project = ref(null);
  const allRoles = ref(null);
  const changeStatus = ref(true);
  const { projects } = useProjects();
  const { getRoles } = useMember();
  async function getAllProjects() {
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
  async function getRoleOfProject(projectId) {
    try {
      const response = await getRoles(projectId);
      allRoles.value = response?.roles;
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
    getRoleOfProject(projectId);
  }
  return {
    allProjects,
    allFavoriteProjects,
    allInviteProjects,
    allArchiveProjects,
    changeStatus,
    project,
    allRoles,
    getAllProjects,
    getRoleOfProject,
    getProject,
  };
});

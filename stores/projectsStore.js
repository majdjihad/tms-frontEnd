import { defineStore } from "pinia";
import { useProjects } from "~/composables/useProjects";
import { useMember } from "~/composables/useMember";
import { useUser } from "~/composables/useAuth";

export const useProjectsStore = defineStore("useProjects", () => {
  // decler all projects variables
  const user = useUser();
  const allProjects = ref(null);
  const allFavoriteProjects = ref(null);
  const allInviteProjects = ref(null);
  const allArchiveProjects = ref(null);
  const history = ref(null);
  const project = ref(null);
  const allRoles = ref(null);
  const changeStatus = ref(true);
  const { projects } = useProjects();
  const { getRoles } = useMember();

  // get all Projects
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
      return navigateTo(`/`, { replace: true });
    }
  }
  // get roles of project
  async function getRoleOfProject(projectId) {
    try {
      const response = await getRoles(projectId);
      allRoles.value = response?.roles;
    } catch (error) {
      console.log(error);
      return navigateTo(`/projects`, { replace: true });
    }
  }
  // get project details
  async function getProject(projectId) {
    const { detailsProject } = useProjects();
    try {
      const response = await detailsProject(projectId);
      project.value = response?.project;
    } catch (error) {
      console.log(error);
      return navigateTo(`/projects`, { replace: true });
    }
    if (user.value.id === project.value.user_id) {
      getRoleOfProject(projectId);
    }
  }

  return {
    allProjects,
    allFavoriteProjects,
    allInviteProjects,
    allArchiveProjects,
    history,
    changeStatus,
    project,
    allRoles,
    getAllProjects,
    getRoleOfProject,
    getProject,
  };
});

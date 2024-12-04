import { $larafetch } from "~/utils/$larafetch";

export const useMember = () => {
  async function getRoles(projectId) {
    const response = await $larafetch(`api/projects/${projectId}/role`, {
      method: "get",
    });
    return response;
  }
  async function addMember(projectId, credentials) {
    const response = await $larafetch(`api/projects/${projectId}/team/invite`, {
      method: "post",
      body: credentials,
    });
    return response;
  }
  async function getInvitation(invite_identify) {
    const response = await $larafetch("api/invitation", {
      method: "post",
      body: invite_identify,
    });
    return response;
  }
  async function invitationAccept(acceptStatus) {
    const response = await $larafetch("api/invitation/accept", {
      method: "post",
      body: acceptStatus,
    });
    return response;
  }
  async function removeMember(projectId, teamMemberId) {
    const response = await $larafetch(
      `api/projects/${projectId}/team/${teamMemberId}/delete`,
      {
        method: "post",
      }
    );
    return response;
  }
  return {
    getRoles,
    addMember,
    getInvitation,
    invitationAccept,
    removeMember,
  };
};

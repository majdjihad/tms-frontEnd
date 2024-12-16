/**
 * Member management composable providing functionality for adding, removing for amemeber
 */
import {$larafetch} from "~/utils/$larafetch";

export const useMember = () => {
  /** Get goles and permissions for a specific project information */
  async function getRoles(projectId) {
    return await $larafetch(`api/projects/${projectId}/role`, {
      method: "get",
    });
  }

  /** Add a new member to a project */
  async function addMember(projectId, credentials) {
    return await $larafetch(`api/projects/${projectId}/team/invite`, {
      method: "post",
      body: credentials,
    });
  }
  
  /** Get invitation details */
  async function getInvitation(invite_identify) {
    return await $larafetch("api/invitation", {
      method: "post",
      body: invite_identify,
    });
  }

  /** Accept invitation to join a project */
  async function invitationAccept(acceptStatus) {
    return await $larafetch("api/invitation/accept", {
      method: "post",
      body: acceptStatus,
    });
  }

  /** Remove a member from a project */
  async function removeMember(projectId, teamMemberId) {
    return await $larafetch(
        `api/projects/${projectId}/team/${teamMemberId}/delete`,
        {
          method: "post",
        }
    );
  }
  return {
    getRoles,
    addMember,
    getInvitation,
    invitationAccept,
    removeMember,
  };
};

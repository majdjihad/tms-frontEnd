import {$larafetch} from "~/utils/$larafetch";
import {useBacklogStore} from "~/stores/backlogStore";
export const useBacklog = () => {
    const backlogStore = useBacklogStore();

    async function backlog(projectId) {
        const response = await $larafetch(`api/projects/${projectId}/backlog`, {
            method: "get"
        })
        return response
    }

    async function createSprint(projectId) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/sprints/create`, {
            method: "post"
        })
        await backlogStore?.getBacklogProject(projectId)
        return response
    }

    async function editSprint(projectId, sprintId, credentials) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/sprints/${sprintId}/edit`, {
            method: "post",
            body: credentials
        })
        await backlogStore?.getBacklogProject(projectId)
        return response
    }

    async function deleteSprint(projectId, sprintId, credentials) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/sprints/${sprintId}/delete`, {
            method: "post",
            body: credentials
        })
        await backlogStore?.getBacklogProject(projectId)
        return response
    }

    async function createIssue(projectId, credentials) {
        const response = await $larafetch(`api/projects/${projectId}/issues/create`, {
            method: "post",
            body: credentials
        })
        return response
    }

    async function createLabel(projectId, issueId, credentials) {
        const response = await $larafetch(`api/projects/${projectId}/issue/${issueId}/label/create`, {
            method: "post",
            body: credentials
        })
        return response
    }

    async function moveIssue(projectId, issueId, credentials) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/issues/${issueId}/move`, {
            method: "post",
            body: credentials
        })
        return response;
    }

    async function moveMultipleIssue(projectId, credentials) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/bulk-issues/move`, {
            method: "post",
            body: credentials
        })
        return response;
    }

    async function deleteIssue(projectId, issueId) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/issues/${issueId}/delete`, {
            method: "post",
        })
        return response
    }

    async function deleteMultipleIssues(projectId, credentials) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/bulk-issues/delete`, {
            method: "post",
            body: credentials
        })
        await backlogStore?.getBacklogProject(projectId)
        return response
    }

    async function editMultipleIssue(projectId, credentials) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/bulk-issues/edit`, {
            method: "post",
            body: credentials
        })
        await backlogStore?.getBacklogProject(projectId)
        return response
    }

    async function issueType(projectId, issueId) {
        const response = await $larafetch(`api/projects/${projectId}/issues/${issueId}/type-issue`, {
            method: "get"
        })
        return response
    }

    async function statuses(projectId) {
        const response = await $larafetch(`api/projects/${projectId}/statuses`, {
            method: "get"
        })
        return response
    }
    async function issueDescription(projectId, issueId) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/issues/${issueId}/show`, {
            method: "get"
        })
        return response
    }
    async function issueComments(projectId, issueId) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/issues/${issueId}/comments`, {
            method: "get"
        })
        return response
    }

    async function editIssue(projectId, issueId, credentials) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/issues/${issueId}/edit`, {
            method: "post",
            body: credentials
        })
        return response
    }
    async function editPriority(projectId, issueId, credentials) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/issues/${issueId}/edit-priority`, {
            method: "post",
            body: credentials
        })
        return response
    }

    async function addComment(projectId, issueId, credentials) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/issues/${issueId}/comments/create`, {
            method: "post",
            body: credentials
        })
        return response
    }

    async function editComment(projectId, issueId, commentId, credentials) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/issues/${issueId}/comments/${commentId}/edit`, {
            method: "post",
            body: credentials
        })
        return response
    }
    async function deleteComment(projectId, issueId, commentId) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/issues/${issueId}/comments/${commentId}/delete`, {
            method: "post"
        })
        return response
    }
    async function issueHistory(projectId, issueId, pageNum) {
        const response = await $larafetch(`api/projects/${projectId}/backlog/issues/${issueId}/history/?page=${pageNum}`, {
            method: "get"
        })
        return response
    }
    return {
        backlog,
        backlogStore,
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
        issueDescription,
        issueComments,
        editIssue,
        editPriority,
        addComment,
        editComment,
        deleteComment,
        issueHistory
    }
}
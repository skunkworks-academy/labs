# Instructor guide - LAB-DEV-101

## Purpose

This 60-minute browser-only lab introduces Git and GitHub collaboration as a secure delivery system, not a command-memorisation exercise. It does not ask learners to create an account, run Git, access a repository or handle a real credential.

## Learning outcomes

By the end, learners should be able to:

1. explain how branches, commits, pull requests, reviews and merges form a change path;
2. write or evaluate a pull-request description that makes validation and risk visible;
3. describe the purpose of default-branch protection/rulesets and required checks; and
4. state the correct first response to suspected secret exposure.

## Suggested timing

| Segment | Minutes | Facilitation focus |
| --- | ---: | --- |
| Change workflow | 15 | Explain the difference between source-control objects and team delivery practices. |
| Pull-request review | 20 | Use the scenario to review intent, evidence, risk and rollback. |
| Branch/secret protection | 15 | Discuss protection controls and why deletion is not sufficient remediation for a secret. |
| Assessment and debrief | 10 | Ask learners to identify one rule that protects speed and quality together. |

## Concepts to reinforce

- A **branch** isolates related work from the default branch; a **commit** records a coherent unit; a **pull request** makes a change reviewable; a **review** provides independent inspection; a **merge** integrates an approved change.
- Pull requests should name the outcome, scope, validation, known risks and recovery considerations. They are evidence containers, not approval ceremonies.
- Rulesets/branch protection can require approving reviews or passing status checks before merging into selected branches. Bypasses should be restricted and auditable.
- Secret scanning is a detection control. Prevention means never committing secrets, using approved secret management and treating exposure as an incident that warrants rotation/revocation and investigation.

## Answer guide

### Checkpoint 1: workflow

Correct answer: create a focused branch, make a coherent commit, run relevant checks and open a pull request. Direct unreviewed changes to main are not the default path for a shared production repository.

### Checkpoint 2: review

Correct answer: include the linked need, focused scope, validation evidence, risks, rollback information and full diff. The reviewer must be able to evaluate the change independently.

### Checkpoint 3: protection

Correct answer: protect main with pull-request/check requirements, restrict bypasses and use approved secret storage. A suspected exposed credential should be rotated/revoked and investigated; deleting a visible line does not reliably remove historic exposure.

### Knowledge check

| Question | Correct answer | Why |
| --- | --- | --- |
| 1 | Isolated, reviewable related work | This is the branch purpose. |
| 2 | Focused, understandable coherent change | This is a useful commit. |
| 3 | Purpose, scope, validation, risk and diff | This makes the PR reviewable. |
| 4 | Require reviews/checks before merging | This is a key protection/ruleset use. |
| 5 | Revoke/rotate and investigate | An exposed credential needs containment. |
| 6 | Restricted, logged and reviewed bypass | Exceptions must be accountable. |
| 7 | Authorised access and the current process | The lab does not authorise repository changes. |

## Evidence of learning

Ask learners to draft a pull-request summary for a fictional change including:

- a user/problem statement and acceptance criteria;
- branch name and concise commit message;
- changed components and excluded scope;
- validation results and manual checks;
- security/operational considerations; and
- rollback/recovery plan and named reviewer role.

## Accessibility and delivery

- Learners do not need to memorise terminal commands in this first lab; focus on understanding collaborative intent and safeguards.
- Do not request personal access tokens, passwords, private keys or real project URLs from learners.
- A follow-on sandbox should use an intentionally disposable repository, scoped collaboration permissions, dummy data and an instructor-led review workflow.

## Reference material

- [Managing a branch protection rule](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule)
- [Available rules for rulesets](https://docs.github.com/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
- [About secret scanning](https://docs.github.com/code-security/secret-scanning/about-secret-scanning)
- [GitHub repository best practices](https://docs.github.com/enterprise-cloud@latest/repositories/creating-and-managing-repositories/best-practices-for-repositories)

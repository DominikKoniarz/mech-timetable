## Plan: Edit Profile Dialog Feature

Implement an edit-profile flow that mirrors the current add-profile form architecture and visual style, while keeping edit-specific logic separated (dialog component, form hook, reset hook, and zod schema). Reuse existing fetch/select UI patterns, extend profile persistence with an update operation, and wire a dedicated edit dialog state in the actions-menu store.

**Steps**

1. Phase 1: Extend profile state and persistence foundations.
2. Add edit-dialog state/actions to actions menu store: open/close flag, pending edit profile index, open helper, and clear helper; match existing delete-dialog patterns. _blocks steps 4-6_
3. Add profile update capability to user preferences hook with index guards and immutable replacement of the selected profile entry in cookie-backed preferences. _blocks step 5_
4. Phase 2: Create edit form contracts and behavior.
5. Add a dedicated zod schema for edit form using the same field structure and constraints as add form, but with edit dialog validation namespace for i18n. _parallel with step 6_
6. Create a dedicated edit form hook that:
    - Initializes React Hook Form with existing profile values as defaultValues.
    - Watches department changes for dependent group fetching.
    - Submits through the new update-profile method.
    - Closes dialog on success.
    - Keeps current selected profile unchanged after save (per decision).
    - Exposes dirty/valid/submittable state so Save is enabled only when form changed and valid.
7. Create a dedicated edit form reset hook to keep groups array synchronized with fetched groups-by-letter after department changes while preserving initial values for first render.
8. Phase 3: Build UI components and wire entry points.
9. Create edit-profile dialog component mirroring add-profile dialog layout and states (header, same form fields, loading skeletons, groups fetch error + retry, footer action), reusing the same visual patterns/components. _depends on steps 2, 5, 6, 7_
10. Reuse current add-profile selects component via either:

- Option A (recommended): make it namespace- and form-type-agnostic so both add and edit can render identical selects; or
- Option B: keep existing add selects untouched and add an edit-specific copy if generics/i18n coupling becomes noisy.

11. Wire edit button in profile options menu to open edit dialog with current profile index, while preserving existing delete behavior.
12. Mount edit dialog from actions menu root alongside add/delete dialogs so it is always available within menu context.
13. Phase 4: Internationalization and polish.
14. Add edit dialog translation namespace in EN and PL with full parity to add dialog labels/placeholders/errors and submit text adapted to edit semantics.
15. Keep aria labels and button styling consistent with current action-menu profile options and add-dialog visual vibe.
16. Phase 5: Verification.
17. Run static checks (`pnpm lint`, `pnpm types:check`).
18. Manual test matrix:

- Open edit from profile options and confirm prefilled values.
- Edit only name and save; verify profile label updates.
- Change department and ensure groups reset/reload correctly.
- Trigger groups fetch error and verify retry path.
- Verify Save disabled until form is changed.
- Verify editing non-selected profile does not change active profile.
- Verify cancel/close clears pending edit index and does not persist changes.

**Relevant files**

- `/Volumes/Programming/Projects/mech-timetable/src/views/main-page/stores/actions-menu-store.ts` — extend dialog state/action model using delete-dialog conventions.
- `/Volumes/Programming/Projects/mech-timetable/src/hooks/use-user-preferences.ts` — add `updateProfile` persistence helper.
- `/Volumes/Programming/Projects/mech-timetable/src/views/main-page/components/action-menu/profiles/profile-options-menu.tsx` — wire edit button click.
- `/Volumes/Programming/Projects/mech-timetable/src/views/main-page/components/action-menu/actions-menu.tsx` — mount edit dialog component.
- `/Volumes/Programming/Projects/mech-timetable/src/views/main-page/components/action-menu/profiles/add-profile-dialog.tsx` — reference structure/style parity baseline.
- `/Volumes/Programming/Projects/mech-timetable/src/views/main-page/hooks/use-add-profile-form.ts` — reference hook baseline for resolver/watch/submit behavior.
- `/Volumes/Programming/Projects/mech-timetable/src/views/main-page/hooks/use-add-profile-form-reset.ts` — reference dependent-group reset behavior.
- `/Volumes/Programming/Projects/mech-timetable/src/schema/add-profile-form-schema.ts` — reference validation parity.
- `/Volumes/Programming/Projects/mech-timetable/messages/en.json` — add `editProfileDialog` translations.
- `/Volumes/Programming/Projects/mech-timetable/messages/pl.json` — add `editProfileDialog` translations.
- New edit-specific files colocated with current add-profile artifacts in the same schema/hooks/components directories (dedicated dialog, schema, form hook, reset hook).

**Verification**

1. Run `pnpm lint` and resolve any introduced lint issues.
2. Run `pnpm types:check` and confirm no type regressions across shared add/edit selects.
3. Validate dialog behavior manually in browser for all edit scenarios listed in the test matrix.
4. Confirm no regressions for add-profile and delete-profile flows.

**Decisions**

- Edit allows changing all fields: profile name, department, and groups.
- Saving edits for a non-selected profile must not switch active profile.
- Save button should be enabled only when form has changes and is valid.
- Scope includes only profile-edit feature and directly related wiring; excludes unrelated menu redesign or persistence model changes.

**Further Considerations**

1. Recommended implementation path: make the selects component reusable between add/edit by injecting translation namespace and shared form value type to avoid duplicated UI logic.
2. If schema duplication starts diverging, consider extracting a shared base profile-form schema factory and exporting add/edit wrappers for namespace-specific typing.

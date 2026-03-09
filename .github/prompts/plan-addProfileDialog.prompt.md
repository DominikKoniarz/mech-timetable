## Plan: Add Profile Dialog with Form

**TL;DR:** Create a new "Add Profile" dialog accessible from the action menu's "Add profile" button. The dialog contains a form (profile name, department select, dynamic group selects) following the welcome form design patterns. New dedicated components, hooks, and schema will be created — copying logic from the welcome form but not reusing its components directly. reCAPTCHA is excluded. Submit handler is mocked with `console.log`.

**Steps**

### 1. Add translation keys

Add `addProfileDialog` section to both [messages/en.json](messages/en.json) and [messages/pl.json](messages/pl.json):

```
addProfileDialog:
  title: "Add Profile" / "Dodaj Profil"
  description: "Create a new timetable profile..." / "Utwórz nowy profil planu zajęć..."
  profileName: "Profile name" / "Nazwa profilu"
  profileNamePlaceholder: "e.g. My profile" / "np. Mój profil"
  department: "Department" / "Oddział"
  selectDepartment: "Select department" / "Wybierz oddział"
  groupWithLetter: "{groupLetter} - group" / "Grupa - {groupLetter}"
  selectGroup: "Select group" / "Wybierz grupę"
  submit: "Add" / "Dodaj"
  fetchGroupsError: "Failed to fetch groups" / "Nie udało się pobrać grup"
  retry: "Retry" / "Spróbuj ponownie"
  validation:
    profileNameRequired: "Profile name is required" / "Nazwa profilu jest wymagana"
    profileNameMaxLength: "Profile name must be at most 32 characters" / "Nazwa profilu może mieć maksymalnie 32 znaki"
    selectDepartment: "Please select department" / "Proszę wybrać oddział"
    selectGroup: "Please select valid group" / "Proszę wybrać poprawną grupę"
```

After editing, regenerate the type declaration file [messages/en.d.json.ts](messages/en.d.json.ts) (ask user to run `pnpm dev` to regenerate types).

### 2. Create the Zod schema

New file: `src/schema/add-profile-form-schema.ts`

- Factory function `getAddProfileFormSchema(t, departments)` taking `TFunction<"addProfileDialog.validation">` and `Department[]`
- Fields:
    - `profileName`: `z.string().check(z.minLength(1, { error: t("profileNameRequired") }), z.maxLength(32, { error: t("profileNameMaxLength") }))`
    - `departmentName`: `z.enum([...departmentNames], { error: t("selectDepartment") })`
    - `groups`: `z.array(z.string().check(z.minLength(1, { error: t("selectGroup") }))).check(z.minLength(1))`
- Export inferred type `AddProfileFormSchema`
- Follow exact pattern from [welcome-form-schema.ts](src/schema/welcome-form-schema.ts), minus `reCaptchaToken`

### 3. Create the form hook

New file: `src/views/main-page/hooks/use-add-profile-form.ts`

- Accepts `departments: Department[]` and `onOpenChange: (open: boolean) => void`
- Uses `useForm<AddProfileFormSchema>` with `zodResolver(getAddProfileFormSchema(t, departments))`
- Default values: `{ profileName: "", departmentName: "", groups: [] }`
- Uses `useWatch` on `departmentName` to track selected department
- Mock `onSubmit`: `form.handleSubmit((data) => { console.log("Add profile submit:", data); onOpenChange(false); })`
- Returns `{ form, onSubmit, selectedDepartmentName }`

### 4. Create the group fetch hook (dedicated copy)

New file: `src/views/main-page/hooks/use-fetch-add-profile-groups.ts`

- Copy logic from [use-fetch-department-groups.ts](src/views/welcome-page/hooks/use-fetch-department-groups.ts)
- Change query key to `["add-profile", "department-groups", departmentName]` to avoid cache collisions with the welcome page
- Same Eden client call, same return shape `{ groupsByFirstLetter, isLoading, isError, refetch }`

### 5. Create the form reset hook (dedicated copy)

New file: `src/views/main-page/hooks/use-add-profile-form-reset.ts`

- Simplified version of [use-form-reset.ts](src/views/welcome-page/hooks/use-form-reset.ts)
- When groups load, fill `groups` array with empty strings (one per group letter key)
- When department changes to one with no groups, just reset groups to empty
- No `reCaptchaToken` handling, no `userPreferences` dependency
- Accepts `{ form, groupsByFirstLetter, isLoadingGroups }` (typed with `UseFormReturn<AddProfileFormSchema>`)

### 6. Create the departments fetch hook (dedicated copy)

New file: `src/views/main-page/hooks/use-fetch-departments.ts`

- Copy from [use-fetch-departments.ts](src/views/welcome-page/hooks/use-fetch-departments.ts)
- Use `useQuery` (not `useSuspenseQuery`) since this is inside a dialog, not a page-level component — or use `useSuspenseQuery` with a `Suspense` boundary inside the dialog
- Query key: `["add-profile", "departments"]`
- Returns `{ departments, isLoading, isError }`

### 7. Create the dialog form selects component

New file: `src/views/main-page/components/action-menu/add-profile-selects.tsx`

- Copy design from [welcome-selects.tsx](src/views/welcome-page/components/welcome-selects.tsx)
- Use `useFormContext<AddProfileFormSchema>()` instead of `WelcomeFormSchema`
- Use translations from namespace `addProfileDialog` instead of `welcomePage.form`
- Renders department `Select` + dynamic group `Select`s per group letter

### 8. Create the dialog component

New file: `src/views/main-page/components/action-menu/add-profile-dialog.tsx`

- Props: `{ open, onOpenChange, departments }` (controlled dialog pattern matching [export-ics-dialog.tsx](src/views/main-page/components/action-menu/export-ics-dialog.tsx))
- Uses `useAddProfileForm(departments, onOpenChange)` hook
- Uses `useFetchAddProfileGroups(selectedDepartmentName)` hook
- Uses `useAddProfileFormReset(...)` hook
- Renders `Dialog` > `DialogContent` > `DialogHeader` (title + description) > `<form>` > `<Form {...form}>` > `<Input>` for profile name + `<AddProfileSelects>` + loading skeletons when fetching groups + error state + submit `Button` in `DialogFooter`
- Form layout follows welcome form vibe: stacked fields with spacing

### 9. Create the dialog button component

New file: `src/views/main-page/components/action-menu/add-profile-dialog-button.tsx`

- Props: `{ onClick, disabled }`
- Wraps `ActionMenuButton` with `<Plus />` icon
- Uses translations from `addProfileDialog` namespace for text/aria-label
- Pattern matches [export-ics-dialog-button.tsx](src/views/main-page/components/action-menu/export-ics-dialog-button.tsx)

### 10. Update useActionsMenu hook

In [use-actions-menu.ts](src/views/main-page/hooks/use-actions-menu.ts):

- Add `addProfileDialogOpen` / `setAddProfileDialogOpen` state (same pattern as `exportIcsDialogOpen`)
- Add `openAddProfileDialog()` method that calls `closeMenu()` then `setAddProfileDialogOpen(true)`
- Return the new state + opener

### 11. Update ActionsMenu component

In [actions-menu.tsx](src/views/main-page/components/action-menu/actions-menu.tsx):

- Import `AddProfileDialog` and `AddProfileDialogButton`
- Destructure new `addProfileDialogOpen`, `setAddProfileDialogOpen`, `openAddProfileDialog` from `useActionsMenu`
- Replace the current dead `ActionMenuButton` (lines 68-73) with `<AddProfileDialogButton onClick={openAddProfileDialog} disabled={preferences.profiles.length >= 3} />`
- Render `<AddProfileDialog open={addProfileDialogOpen} onOpenChange={setAddProfileDialogOpen} />` as sibling to the `ExportIcsDialog` (outside the `Popover`)
- The dialog will internally fetch departments, so no need to pass them as props from the parent

### File summary

| File                                                                                                                       | Action                                 |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| [messages/en.json](messages/en.json)                                                                                       | Add `addProfileDialog` keys            |
| [messages/pl.json](messages/pl.json)                                                                                       | Add `addProfileDialog` keys            |
| `src/schema/add-profile-form-schema.ts`                                                                                    | **New** — Zod schema with i18n         |
| `src/views/main-page/hooks/use-add-profile-form.ts`                                                                        | **New** — form hook                    |
| `src/views/main-page/hooks/use-fetch-add-profile-groups.ts`                                                                | **New** — groups query                 |
| `src/views/main-page/hooks/use-add-profile-form-reset.ts`                                                                  | **New** — reset on dept change         |
| `src/views/main-page/hooks/use-fetch-departments.ts`                                                                       | **New** — departments query            |
| `src/views/main-page/components/action-menu/add-profile-selects.tsx`                                                       | **New** — form selects                 |
| `src/views/main-page/components/action-menu/add-profile-dialog.tsx`                                                        | **New** — dialog + form                |
| `src/views/main-page/components/action-menu/add-profile-dialog-button.tsx`                                                 | **New** — menu button                  |
| [src/views/main-page/hooks/use-actions-menu.ts](src/views/main-page/hooks/use-actions-menu.ts)                             | **Edit** — add dialog state            |
| [src/views/main-page/components/action-menu/actions-menu.tsx](src/views/main-page/components/action-menu/actions-menu.tsx) | **Edit** — wire button + render dialog |

### Verification

- Open the app, click the profile trigger button, confirm "Add profile" button appears and is disabled when 3 profiles exist
- Click "Add profile" — dialog opens, popover closes
- Department select loads departments from API; selecting one fetches + renders group selects
- Changing department resets group selections
- Profile name field enforces max 32 chars and shows validation errors
- Submitting with valid data logs to console and closes dialog
- Submitting with invalid data shows translated validation messages
- Test both `en` and `pl` locales for translations
- Close dialog via X button or overlay click — form state resets

### Decisions

- **Departments fetched inside dialog** (via `useQuery` on open) rather than passed from parent — keeps the action menu component clean and avoids prop-drilling from a server component
- **Separate query keys** (`["add-profile", ...]` vs `["welcome", ...]`) to isolate cache from the welcome page
- **`useQuery` over `useSuspenseQuery`** for departments in the dialog — allows showing a loading spinner inside the dialog content rather than requiring a Suspense boundary
- **Mock submit** uses `console.log` per requirements — real persistence (cookie update) to be implemented later

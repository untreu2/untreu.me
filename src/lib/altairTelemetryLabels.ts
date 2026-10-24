// These labels mirror the backend's static telemetry enums. Unknown strings are
// never rendered as event metadata; a later enum needs an explicit UI update.
const actions = new Set(`first_open app_open app_background app_foreground session_start session_end intro_view intro_continue anonymous_auth_start anonymous_auth_success anonymous_auth_failure onboarding_view onboarding_step_complete onboarding_complete consent_view consent_submit consent_dismiss consent_withdraw health_permission_request health_permission_result assistant_open question_submit question_complete question_failure question_cancel first_answer_rendered save_progress_view save_progress_dismiss auth_start auth_success auth_failure auth_cancel auth_collision action_resume purchase_open purchase_start purchase_success purchase_failure purchase_cancel restore_start restore_success restore_failure record_save_request record_saved record_deleted review_approve review_cancel tab_open settings_open settings_action sign_out account_delete_request account_delete_failure voice_start voice_stop memory_action app_error anonymous_created account_linked consent_given answer_completed account_required server_request`.split(' '))
const surfaces = new Set(`app intro onboarding consent assistant voice save_progress apple_sign_in phone_sign_in membership purchase meal workout journal settings profile privacy health memory notifications home diet cook training reports account`.split(' '))
const reasons = new Set(`started completed cancelled dismissed required first_answer allowance record_save purchase existing_account linked new_account granted denied restricted unavailable network invalid_credential unknown open close enable disable clear delete restore save edit add retry timeout background foreground continue name gender units age diet_preferences health_connection`.split(' '))
const errors = new Set(`unknown network timeout cancelled unauthorized account_required account_deleted provider_not_allowed identity_refresh_required identity_unavailable privacy_consent_required privacy_version_changed privacy_conflict ai_unavailable voice_unavailable agent_unavailable agent_message_limit_reached subscription_required subscription_unavailable meal_conflict invalid_request internal_error firebase_network firebase_credential_in_use firebase_invalid_credential firebase_user_disabled firebase_operation_not_allowed firebase_unknown purchase_failed restore_failed`.split(' '))
const actionLabels: Record<string, string> = {
  first_open: 'First tracked open', intro_view: 'Intro shown', intro_continue: 'Intro continued', anonymous_created: 'Anonymous account created',
  consent_given: 'Assistant consent confirmed', answer_completed: 'Answer completed', save_progress_view: 'Save progress viewed',
  account_linked: 'Account linked', account_required: 'Saved account required', first_answer_rendered: 'First answer rendered',
  question_submit: 'Question submitted', question_complete: 'Reply rendered', question_failure: 'Question failed',
  auth_start: 'Sign-in started', auth_success: 'Sign-in succeeded', auth_failure: 'Sign-in failed', auth_cancel: 'Sign-in cancelled',
  auth_collision: 'Existing-account collision', server_request: 'Server request', consent_submit: 'Consent submitted',
}
const surfaceLabels: Record<string, string> = { save_progress: 'Save progress', apple_sign_in: 'Apple sign-in', phone_sign_in: 'Phone sign-in' }
const reasonLabels: Record<string, string> = { first_answer: 'Answer prompt', required: 'Required account', allowance: 'Allowance reached', record_save: 'Save record', existing_account: 'Existing account', linked: 'Account linked' }

function readable(value: string): string {
  return value.split('_').map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word).join(' ')
}

export function actionLabel(name: string): string {
  return actions.has(name) ? actionLabels[name] || readable(name) : 'Other tracked action'
}

export function surfaceLabel(value: string): string | null {
  return surfaces.has(value) ? surfaceLabels[value] || readable(value) : null
}

export function reasonLabel(value: string): string | null {
  return reasons.has(value) ? reasonLabels[value] || readable(value) : null
}

export function errorLabel(value: string): string | null {
  if (!value || value === 'none') return null
  if (/^http_[45][0-9]{2}$/.test(value)) return `Request status ${value.slice(5)}`
  if (value === 'ai_unavailable') return 'Assistant unavailable'
  return errors.has(value) ? readable(value) : 'Other tracked error'
}

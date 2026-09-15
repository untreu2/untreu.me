_Draft for launch review · Prepared 15 September 2026_

This policy describes how Altair, a general wellness app developed by
Emir Yorulmaz (untreu), handles personal information. It covers the Altair iOS app
and its supporting service. Altair’s scores, nutrition estimates, and AI responses
are informational and do not provide medical advice, diagnosis, or treatment.
Read the separate
[Consumer Health Data Privacy Policy](/altair/health-privacy) for health-specific
details and the [health notice](/altair/health-notice) for the app’s limitations.
Reading this policy or accepting the Terms of Use does not, by itself, give
permission for health-data collection or disclosure to AI providers.

## Information Altair handles

- **Account and profile.** Account identifiers, authentication information,
  verified phone details, name and email when provided, an optional profile
  picture, timezone, and app preferences. Firebase handles phone verification.
  Altair’s server keeps a keyed phone fingerprint, the last four digits, and a
  verification time rather than persisting the full phone number in its user
  record. Firebase may retain the full number for authentication.
- **Health and fitness.** Profile details such as age, sex, height, weight,
  dietary preferences, restrictions, and allergies; the Apple Health categories
  you permit; meals and nutrition estimates; and derived reports and scores.
  See the separate health-data policy for categories and sources.
- **Conversations and images.** Messages, assistant replies, conversation
  history, submitted photos, custom assistant instructions, and saved memories
  when remembering is enabled. Health information you type or photograph is
  sensitive even when it did not come from Apple Health.
- **Voice.** Microphone audio during voice conversations and the resulting
  transcripts. Altair streams audio for transcription and keeps the transcript
  in conversation history. Raw voice recordings are not saved in Altair’s
  application database; this does not mean a speech provider has no retention.
- **Subscriptions and operation.** Purchase and entitlement information, usage
  counts, device and app version information, push notification tokens,
  notification preferences, and operational request metadata. Apple handles
  payment details; Altair does not receive your payment card number.

## Purposes

Altair uses this information to authenticate accounts, synchronize approved
health history, show reports and scores, maintain the meal journal, respond to
messages, provide speech features, remember context when enabled, deliver
requested notifications, verify subscriptions, enforce usage limits, and keep
the service working securely. Altair does not sell personal health information
or use it to serve advertising.

## Who processes information

- **Altair’s server and database infrastructure** store account information,
  approved health history, reports, meals, photos, messages, and settings.
- **Apple** provides Apple Health permissions, Sign in with Apple where used,
  App Store purchases, and push delivery.
- **Firebase (Google)** provides authentication, phone verification, and account
  management. Firebase and Apple may process technical information required to
  provide those services.
- **RevenueCat** verifies and manages subscription entitlements using your
  Firebase account identifier and purchase information. Health records are not
  included in Altair’s subscription requests.
- **OpenRouter and the model providers serving requests** process relevant
  health summaries, profile and meal context, recent conversation messages,
  instructions, enabled memories, and photos you submit for AI features. The
  configured default model is Google Gemini; routing and configuration determine
  the actual serving provider. Altair does not include Firebase credentials or
  raw HealthKit sample records in AI prompts. Summaries remain health data and
  are not necessarily anonymous.
- **ElevenLabs** transcribes streamed microphone audio and converts assistant
  reply text to speech. Spoken words and reply text can contain health
  information. Transcripts also go through the AI conversation flow above.

Provider processing can take place outside your country. Provider retention and
data-use settings differ by service and contract. This policy does not promise
that providers retain nothing or that their training restrictions have been
verified. Deployment regions, applicable transfer safeguards, and provider
retention terms must be finalized before this draft becomes the launch policy.

## Storage and retention

Altair stores health history and content against your account on its server.
The initial Apple Health import covers a rolling 30-day period; subsequent syncs
add changes. That import window is **not** a 30-day deletion schedule. Account
content currently remains until deleted; there is no automatic account-content
expiry schedule in the application.

Deleting a meal removes its content and photo from the active journal storage.
An identifier and request hash may remain to prevent a retry from recreating the
deleted meal. Deleting a saved memory does not erase the conversation it came
from. Apple Health deletions remove synchronized measurements on a later
successful sync; minimal synchronization markers remain. Existing reports and
conversations may still contain information derived from earlier measurements.

In-app account deletion removes Altair-owned account records and associated
content from the active database and coordinates authentication-account
deletion. It does not cancel your Apple subscription or erase Apple Health’s
original records. Provider records and backups have separate lifecycles. Backup
expiry, operational-log retention, and provider deletion procedures need to be
confirmed before launch; immediate erasure from every system is not promised.

The app protects its private account cache using iOS file protection and excludes
that cache from device backups. Requests to the production service use HTTPS.
These safeguards do not make the service end-to-end encrypted: its servers and
AI or speech processors need access to relevant information to provide features.

## Your choices and requests

- Review or revoke Apple Health access in the Health app’s access settings.
  Revoking access stops future reads; it does not erase already uploaded data.
- Use text instead of voice; camera and microphone access are controlled through
  iOS permissions. Selecting a photo does not send it until you submit it.
- Review, delete, or disable saved memories under **Settings → Data & privacy →
  Assistant memory**. Disabling memory does not delete stored history.
- Edit or delete meals in **Diet**, change profile information in Settings, and
  delete the account under **Settings → Account**.
- Manage notifications in Altair and iOS; manage or cancel subscriptions in the
  App Store.

Depending on applicable law, you may have rights to access, correct, obtain a
portable copy of, or delete your information, restrict or object to processing,
withdraw consent, and complain to a data-protection authority. A private contact
channel and a verified process for handling these requests must be added before
launch. Do not post health information in public GitHub issues or social posts.

## Age and policy changes

The launch age limit and any child or teen consent arrangements must be settled
before release. This draft does not represent that parental consent or an age
restriction is enforced by the current app.

Material changes will be reflected in the policy date and explained in the app
where appropriate. New uses or disclosures that require consent need a separate
permission step before they begin.

## Contact

Developer: **Emir Yorulmaz (untreu)**. Developer profiles:
[X](https://x.com/_untreu) and [GitHub](https://github.com/untreu2/).
The operator’s final legal contact details and a private privacy-request address
are pending launch review. These public profiles are not a place to submit
health records.

The app license is covered by
[Apple’s standard Terms of Use (EULA)](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/).

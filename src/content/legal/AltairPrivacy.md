_Last updated 19 September 2026_

Altair is a general wellness app operated by **Emir Yorulmaz (untreu)**. This
policy explains how the iOS app and its supporting services handle personal
information. For privacy, access or deletion requests, contact
[contact@dame.dev](mailto:contact@dame.dev).

This release keeps your health profile and conversation history on your iPhone
and stores assistant memory with your account. Your display name, profile photo
and saved account memory can be used when you sign in on another device; your
local health profile and private history cannot be restored. Before cloud AI
use, a renewed notice asks for agreement to AI processing, selected health
context and account memory, including if you agreed to an earlier version.
Only a detail you explicitly ask Altair to remember and confirm is saved as a
new account note. Voice requires an additional agreement. Microphone audio
streams through Altair’s server to ElevenLabs; recognized text and selected
context use cloud AI. Completed reply or action-confirmation text passes to
ElevenLabs for speech. Records from earlier versions follow **Records from
earlier versions** below.

Altair's scores, nutrition estimates and AI replies are informational. They do
not provide medical advice, diagnosis or treatment. Read the separate
[Consumer Health Data Privacy Policy](/altair/health-privacy) and
[health notice](/altair/health-notice). Reading a policy or accepting the Terms
of Use does not give permission to use AI or voice features.

## Information stored on your iPhone

- **Apple Health information.** With Apple's separate permission, Altair reads
  the categories you allow and calculates daily summaries on your device. Raw
  records remain in Apple Health. Altair does not upload raw HealthKit records
  or send background health batches to its server.
- **Health profile and preferences.** Age, sex, height, weight, dietary
  preferences, restrictions and allergies are stored on this iPhone, together
  with your units, time zone and week-start preferences. Altair does not sync
  these profile fields or preferences to your account for restoration.
- **Meal journal.** Meal descriptions and photos, eating times and nutrition
  estimates are stored locally. Profile photos are handled separately below.
- **Reports and conversations.** Calculated reports and scores, chat history,
  voice transcripts, and your response instructions are stored locally. Some
  saved content may contain health information or other sensitive details.
- **Earlier device-only assistant notes.** These remain on the iPhone and are
  excluded from AI requests unless you explicitly choose to save them to your
  account in the separate review described below. Agreeing to cloud AI does not
  upload these notes.

These records support your wellness history, reports, journal and conversations.
Local health features and manual edits work without cloud-AI permission. The app
uses iOS file protection for its private files and excludes them from device
backups. Altair does not provide cloud restoration or cross-device syncing of
this health profile, preferences or private history. Deleting the app, a fresh
installation or changing devices starts with new local data. Your display name
and profile photo can return when you sign in, but Altair cannot recover the
other local records. Returning accounts skip health setup; you can add local
profile details in Settings. With your permission, available Apple Health
information can be read again. That does not restore old meals, conversations,
response instructions or other Altair-only history.

## Information Altair's services retain

- **Display name and profile photo:** the name and photo you choose are saved
  with your account so they can be restored on a new installation or device.
  A photo or name you supply can itself contain sensitive information. This
  account sync does not include your health profile or personalization fields.
- **Account and authentication information:** account identifiers, email when
  supplied by authentication, verification status, adult confirmation status,
  and related account metadata. Firebase handles phone
  verification and may retain your
  full phone number. Altair's user record stores a keyed phone fingerprint, the
  last four digits and a verification time instead of the full number.
- **Subscriptions and operation:** purchase and entitlement information, usage
  counters, device registrations, app versions, push tokens, notification
  preferences and operational request metadata. These support authentication,
  subscriptions, security and service operation. Apple handles payments;
  Altair does not receive your payment card number.
- **Privacy choices:** your consent decisions, disclosure version, revision and
  decision times, including changes. These let the service enforce your choices.
- **Assistant memory:** details you explicitly ask Altair to remember and
  confirm are saved as notes with your account for future conversations,
  including on another signed-in device. Notes may contain personal or health
  information you choose to provide. Altair does not automatically extract
  memory from Apple Health, your health profile, journal or ordinary
  conversations. Earlier device-only notes are saved to the account only after
  the separate import review. Existing server notes remain account notes until
  you clear them or delete the account.
- **Requests you send us:** your contact details and correspondence when you
  email support or exercise a privacy right.

Altair's hosting and database providers process this information to operate
the service. They also carry the temporary AI and speech requests, including
microphone audio, recognized voice text and text sent for speech generation,
described below and may retain older records as described under
**Records from earlier versions**.

## Optional AI processing

Before your first AI dialogue, Altair presents the AI and account-memory notice
and asks for your permission. When you submit a request, your message,
deliberately attached photos, relevant conversation text and local response
instructions pass through Altair's server to
**OpenRouter and Google Vertex**, which provide the AI response. Saved account
notes are included only while memory is on. Meal analysis also uses this flow.
A message or photo can contain health information even when it did not come
from Apple Health.

The AI notice also covers selected health context. Altair uses your question to
select relevant summaries from your on-device health reports, profile or meal
journal and relevant conversation history. Only that selected context is sent
for the request; raw HealthKit sample timelines and the complete health history
are not sent. Summaries remain sensitive health information and are not
necessarily anonymous. The current app does not offer an independent switch to
use AI while excluding health context.

Your decision is saved with your account and remembered for later use, including
on another signed-in device. The privacy notice is not repeated for each
conversation or saved note while the current agreement remains valid. A new
choice is required after withdrawal or a material policy change requiring
renewed consent. Confirming a requested note change is an action review, not a
new privacy agreement. Agreeing does not send a message; processing starts when
you request an AI reply or meal analysis.
You can choose **Not now** and continue using local wellness features. Account
memory has an account-wide on/off switch in **Settings → Data & privacy →
Assistant memory**, alongside **Clear memory**. Turning memory off stops
retrieving saved notes for AI requests and prevents new note saves, while
retaining existing notes. Turning it on resumes their use under your current
AI agreement; changing this switch does not ask for privacy consent again.
Memory starts on for new accounts, but no notes are used or saved before the
first AI agreement. Existing saved off choices are preserved. A separate
confirmed request to remember a detail is required to create a note; agreeing
to the notice or turning memory on does not itself create notes or import
earlier device-only notes.

The local-data service processes these requests temporarily and does not save
their messages, attached photos, selected profile values, summaries or replies
in Altair's application database. This is separate from storing the profile
photo you choose for your account and any notes you explicitly save.
Conversation history and resulting meal changes are saved on your device.

## Optional voice processing

Before first voice use, voice requires its own agreement if not already granted,
in addition to the AI agreement and separate iOS microphone permission. You are speaking with an AI assistant. Recording
begins when you start a call. Microphone audio streams through **Altair’s server
to ElevenLabs and its service providers** for live transcription. Partial text
can appear while you speak; the completed transcript is used for your request.
Your audio can contain health information and other details you choose to say.

Recognized text selects context and obtains a reply through **Altair’s server,
OpenRouter and Google Vertex**, as described above. After the response is
completed, validated and saved on your device, **reply and action-confirmation
text** passes through Altair’s server to **ElevenLabs and its service providers**
to generate the speech you hear. This text can contain health information from
the conversation, selected health context, instructions or saved account notes.

Altair handles microphone and generated audio in memory without saving speech
recordings on its server. Conversation transcripts stay on your iPhone.
ElevenLabs’ retention is separate, as explained below. You can use text without
voice permission. Transcription, AI replies and speech generation need a network
connection.

## Other providers and processing safeguards

- **Apple** provides Apple Health and microphone permissions, App Store
  purchases and push delivery. Apple controls the original records in Apple Health.
- **Firebase (Google)** provides authentication, phone verification and account
  management.
- **RevenueCat** manages subscription entitlements using your account identifier
  and purchase information. Health measurements and conversation content are
  not included in Altair's subscription requests.
- **OpenRouter and Google Vertex** process the selected AI information described
  above, including recognized voice text and selected context, to provide the
  responses you request.
- **ElevenLabs and its service providers** process microphone audio for live
  transcription and completed reply/confirmation text to generate speech.
  Audio, transcripts and reply text may contain health information.

Altair does not sell personal or consumer health data or use it for advertising.
The model requests sent through OpenRouter use the configured Google Vertex EU
route with zero-retention and denied data-collection request settings, without
fallback to another route. These request settings do not by themselves verify
every provider account setting, contract or historical record. They are not a
blanket guarantee of zero retention or no model training.

ElevenLabs speech is separate from the OpenRouter AI route. ElevenLabs retains
speech request and response data by default. Its retention, possible use for
model improvement, and deletion depend on the applicable service agreement,
account settings and [ElevenLabs Privacy Policy](https://elevenlabs.io/privacy-policy).
We do not promise zero retention or no training for speech data. ElevenLabs’
[Zero Retention Mode](https://elevenlabs.io/docs/eleven-api/resources/zero-retention-mode)
requires an eligible Enterprise arrangement and supported requests configured
for it; the AI route’s settings do not apply to ElevenLabs. Changing speech
providers does not delete earlier submissions or historical provider records.

Providers can process information outside your country. Retention, processing
locations and international-transfer arrangements depend on the service and
applicable terms. Contact [contact@dame.dev](mailto:contact@dame.dev) for
information about the providers and arrangements relevant to your request.

Connections to Altair's production service use encrypted transport. Cloud AI
and speech processors need to process submitted audio, text and selected context
to provide their services; these requests are not end-to-end encrypted
between only your devices.

## Retention and deletion

**Local profile and history.** Altair refreshes a rolling 90-day window of
readable Apple Health records to rebuild local summaries. This is a calculation
window, not an overall 90-day deletion policy. Saved reports, conversations, meals and
imported history have no automatic expiry. Signing out leaves the local health
profile, preferences and private history on the same iPhone for that account.
Deleting a meal or conversation removes that item from the local journal or
history. Previously saved reports and
replies may still contain information derived from it.

**Assistant memory.** Saved account notes have no automatic expiry. They remain
until you ask Altair to forget them, use **Settings → Data & privacy → Assistant
memory → Clear memory**, or delete your account. Clear memory requires
confirmation and removes all saved notes from the active account memory store,
including while memory is off. Clearing does not change the memory switch.
After the server confirms deletion, the current iPhone also removes its earlier
device-only notes and memory copies. A failed clear is shown as a failure.
Clearing memory leaves ingredients, response instructions and conversation
history intact. A previous conversation or reply can still mention a forgotten
detail; delete that conversation separately if you want to remove it from local
history. Turning memory off stops retrieval into AI requests and new saves
without deleting notes. It does not remove details already present in a
conversation, which can still be included as conversation context. Turning off
cloud AI also stops memory use and new saves. Clearing active memory does not
recall information already sent to providers or immediately erase backups or
private files on another offline device.

**Name, profile photo and account records.** Your display name and profile photo
remain with the account until changed, removed where supported, or deleted with
the account. Account, subscription, usage, device and consent records are
retained to operate your account until deletion, subject to the exceptions
below. Support correspondence is retained as needed to handle the request and
related legal obligations.

**Account deletion.** Use **Settings → Account** to delete your Altair account.
An **Account** menu also provides deletion while signed in during setup or
when the app cannot finish loading.
This removes active Altair account data and the current iPhone's account files
and starts deletion of the Firebase identity. Identity deletion is retried if
it fails. Minimal hashed deletion markers and deletion audit records remain to
prevent an erased account from being recreated by an old credential. Deletion
on one iPhone cannot immediately erase private files on another offline device.

Deleting your Altair account does not erase original Apple Health records,
cancel an App Store subscription or automatically erase records held separately
by Apple, RevenueCat or other providers. Backups and provider records have
separate retention and deletion processes; an active-database deletion is not a
promise of immediate erasure from every backup or third-party system. Contact
us about those records or to make a deletion request.

## Records from earlier versions

Earlier device-only assistant notes are not uploaded or included in AI requests
automatically. If these notes are present, the app offers a separate review of
the notes with **Save to account** and **Keep on iPhone** choices. Saving them
requires your explicit choice, memory to be on and current cloud-AI agreement.
Keeping them on the iPhone leaves them outside the assistant's shared context. The general AI
agreement alone does not authorize this import. Clear memory also removes these
earlier notes from the current iPhone after the server confirms its deletion.

Earlier Altair versions stored account-linked health records, health profiles,
meals, photos, reports and conversations on the server. The server update for
this release removes previously saved health-profile and personalization values
from active account profiles, while preserving your display name and profile
photo. This removal does not erase those values from historical backups or
previous provider submissions.

Other earlier health records, meals, reports and conversations are not
automatically transferred or deleted when you open the app, accept a notice or
use AI. Legacy transfer routes are retired, and historical records do not gate
new AI requests. Any already-copied device history remains local; remaining
server records are subject to account deletion and applicable retention
processes. Contact us about access to or deletion of earlier records. Historical
backups and prior provider submissions have separate retention processes.

## Your choices and privacy requests

- Review the AI/health-context notice before first use and the additional voice
  notice before voice use. Choose **Not now** to decline. An agreement is
  remembered; accepting it does not itself send a message or start recording.
- Withdraw permission in **Settings → Data & privacy → Privacy & health**.
  Choose **Turn off voice** to stop voice processing, or **Turn off cloud AI**
  to stop cloud AI, selected health-context sharing and voice. Altair stops
  active requests on this device and blocks new submissions immediately. The
  change is sent to your account; if it cannot be saved, the page shows that
  the account update is pending and offers **Retry account update**. Other
  devices and server processing receive the withdrawal when that update succeeds.
  Permission stays off on this device while the update is pending. To enable a
  feature again after synchronization, review its notice and agree again.
  Existing transmitted information cannot be recalled, and withdrawal does not
  automatically delete saved records. Local health features remain available.
- You can also revoke microphone access in iOS Settings to stop recording.
- Review or revoke Apple Health access in the Health app's access settings.
  Revocation stops future reads; it does not erase saved reports or discussions.
- Ask Altair to remember or forget a detail through its confirmation flow. Use
  **Settings → Data & privacy → Assistant memory → Clear memory** to clear all
  saved account notes and earlier notes on this iPhone, whether memory is on
  or off. Use the account-wide memory switch to stop memory use and new saves
  without deleting stored notes. Turning off cloud AI also stops memory use.
  Edit or delete meals in
  **Diet**, and delete conversations from conversation history.
- Manage or cancel subscriptions through the App Store.

Depending on applicable law, you may request access, correction, a portable
copy or deletion, withdraw consent, restrict or object to processing, or lodge
a complaint with the relevant authority. Email
[contact@dame.dev](mailto:contact@dame.dev) and describe the request. We may ask
for information needed to verify your account and authority before acting.
Do not send passwords, verification codes or full health records in your first
email. If you disagree with our response, reply with **Privacy appeal** so it
can be reviewed. Do not post health information in public GitHub issues or
social posts.

## Age and policy changes

Altair is intended for adults aged 18 and over and does not offer a parental
consent route for children or teenagers. Contact
[contact@dame.dev](mailto:contact@dame.dev) if you believe an underage person has
provided information.

We update the date above when this policy changes and explain material changes
in the app where appropriate. New uses or disclosures that need consent require
a fresh decision before processing begins.

## Contact

**Emir Yorulmaz (untreu)** — Altair operator.

Privacy, access, deletion and appeals:
[contact@dame.dev](mailto:contact@dame.dev).

The app license is covered by
[Apple's standard Terms of Use (EULA)](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/).

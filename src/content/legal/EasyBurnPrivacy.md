_Last updated 29 October 2026_

EasyBurn is a calorie-deficit tracker for iPhone operated by **Emir Yorulmaz
(untreu)**. This policy explains how EasyBurn handles information when you use
the iPhone app and its food and workout estimation service. For privacy questions or
requests, contact [contact@dame.dev](mailto:contact@dame.dev).

## Your log stays on your iPhone

EasyBurn does not require an account. Your food log, saved foods, workouts,
body details, weight history, plan and saved meal photos are stored locally. We
do not upload your diary, Health records, body measurements or weight history to
the EasyBurn server.

This local data is excluded from device and iCloud backups because it can
include Health records. Export your data in Profile if you want to keep a copy
or move it to another iPhone. Export files do not include meal-photo files or an
Apple subscription. You control where you save or share exports; the app does
not send them to us automatically. The widget reads a small local snapshot of
today's figures shared with the app on the same device.

Profile's Start Over removes EasyBurn's local log and photos. It does not erase
the original records in Apple Health, cancel your subscription or delete records
held by service providers. A recovery copy may be kept locally if a saved file
is damaged; recovery data is excluded from backups too.

## Apple Health, photos and reminders

With your permission, EasyBurn reads the Apple Health data you choose to share,
such as steps, active energy, workouts and weigh-ins. EasyBurn does not write
Health records. You can change Health permissions in iPhone Settings or the
Health app. Previously imported records remain in EasyBurn until you remove them
or reset the log.

You choose each meal photo from the system photo picker or capture it with the
camera. EasyBurn does not scan your library or upload meals in the background.
Selected photos are resized and re-encoded without their original EXIF
metadata. Camera frames used to recognize barcodes are not uploaded. Meal and
trial reminders are local notifications; you can change their permissions in
iPhone Settings.

## Food and workout estimates

When you request an estimate, your submitted food or workout description, any selected
meal photo, an optional clarification answer and the app's language are sent
through the EasyBurn server to OpenRouter and its model provider. They are used
to generate the estimate. Workout descriptions can include the activity, duration
and intensity that you type. The provider returns the interpreted activity,
duration and an estimated intensity value (MET). EasyBurn calculates the workout's
calories on your iPhone using your weight and net MET, subtracting resting energy.
Your weight is not sent for that calculation. This is separate from uploading your saved log:
Health records, your body profile and weight history are not included. Please
avoid including unrelated personal information in descriptions or photos.

The app explains this sharing before the first request. People who previously
accepted the food-only disclosure see the expanded explanation before their first
request after updating. You review an estimate before adding it to the log.

The EasyBurn server processes descriptions, photos and model replies in
memory and does not save them in its database or request logs. Our requests
require OpenRouter routing that denies provider data collection and uses
endpoints marked for zero data retention; an unavailable compliant endpoint
causes an error. OpenRouter's account settings, operational metadata and
providers' terms still apply. This is not a promise that every outside service
retains no information.

See [OpenRouter's privacy policy](https://openrouter.ai/privacy) and its
[data-collection documentation](https://openrouter.ai/docs/guides/privacy/data-collection)
for processor practices. You can log food or calories manually without making
an online estimate.

## Barcode lookup

When you scan or type a barcode, the app sends its number directly to Open Food
Facts to retrieve the product name and energy. This connection also shares your
IP address and technical request details. Open Food Facts may retain request
records for security, technical analysis and usage statistics. Camera images,
your diary, Health records, body measurements and weight history are not sent
for barcode lookup.

See the [Open Food Facts privacy policy](https://world.openfoodfacts.org/privacy),
including its contact details for access or deletion requests. Deleting
EasyBurn's local data does not delete Open Food Facts' request records.

## Subscriptions and service security

Apple handles purchases and payment details. EasyBurn receives Apple's
subscription information, including the product, transaction identifiers,
subscription status, renewal and trial dates. RevenueCat receives subscription
transactions and anonymous purchase identifiers through Apple server
notifications for subscription reporting. We do not provide RevenueCat with your
diary, food photos, body details or Health records.

To authorize estimates, the app sends Apple's signed subscription
transaction to the EasyBurn server. During a billing grace period it also sends
signed renewal information. The server checks this evidence and stores
anonymous session identifiers, hashed session tokens, keyed hashes of
subscription identifiers, subscription status and bounded usage counters. It
processes network addresses to apply abuse limits, using keyed hashes for
rate-limit and quota records. Operational logs record request status and
duration without description or image contents. The combined food/workout estimate
route does not write routine application request logs; bounded provider-failure
diagnostics contain failure codes, not submitted descriptions or model replies.

Expired sessions and anonymous identities without sessions are removed
regularly. Sessions last no more than 30 days. Estimate-usage counters older
than seven days are removed; subscription-state records remain while needed to
reject replayed or revoked transactions. Restricted operational backups may
retain earlier copies until rotated. Apple and RevenueCat retain their own
transaction records under their applicable terms. See
[Apple's privacy policy](https://www.apple.com/legal/privacy/) and
[RevenueCat's privacy policy](https://www.revenuecat.com/privacy).

## Setup and paywall analytics

EasyBurn no longer collects onboarding progress or paywall-view analytics.
Older app versions may still send event requests, but the server ignores their
contents without recording counts or analytics request logs.

Anonymous totals collected before this change contain only a UTC date, event
name and combined count, with no individual journey or attached identifier.
They expire under the existing 90-day retention limit. Restricted operational
backups may retain earlier copies until rotated. We cannot identify or remove
one person's contribution from a historical aggregate total.

## Support, sharing and your choices

If you email support, we receive the address and information you send and use
it to answer your request. Do not attach Health records, exports or payment
details unless they are needed for the issue you want help with. Support
correspondence is retained as needed to resolve requests and meet applicable
obligations.

We use service providers to host the backend, deliver estimates, look up
products and process subscriptions. Processing may occur outside your country.
EasyBurn does not sell your personal information, use advertising trackers or
share Health records for advertising. We may disclose information where
required by law or necessary to protect the service and its users.

Depending on your location, you may have rights to access, correct, delete,
restrict or object to processing of personal information, request portability
or complain to your local data-protection authority. Contact support to exercise
these rights. We cannot retrieve a diary that exists only on your iPhone or
identify your contribution to a historical aggregate count. Use the app's export, editing
and deletion controls for local records. Requests involving Apple's payments or
another provider's independent records may need to be directed to that
provider.

EasyBurn is intended for adults aged 18 or older. If you believe a child has
sent personal information to the service, contact support. Material changes to
these practices will be reflected in this policy and, where appropriate, in the
app.

See also [EasyBurn Terms of Use](/easyburn/terms) and
[EasyBurn Support](/easyburn/support).

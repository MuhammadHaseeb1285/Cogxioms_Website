/*
 * EmailJS configuration, in one place.
 *
 * Two forms send through the same service and template: the contact form and the
 * footer subscribe box. These IDs were previously written out in each component,
 * which meant rotating the key was a two-file change with no way to tell whether
 * you had found both.
 *
 * The public key is publishable by design — EmailJS expects it in client code —
 * so this is not a secret leaking into the bundle. The service and template IDs
 * are not secrets either.
 *
 * The template expects four fields: name, email, subject, message. A form that
 * only collects an email (the subscribe box) supplies the other three as hidden
 * inputs rather than needing a template of its own.
 */
export const EMAILJS_PUBLIC_KEY = 'oPnz52lsad-Y0j9o-';
export const EMAILJS_SERVICE_ID = 'service_v52b9oc';
export const EMAILJS_TEMPLATE_ID = 'template_1wckpao';

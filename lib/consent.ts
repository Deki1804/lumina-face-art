import { profile } from "@/lib/profile";

export function isConsentFormReady(): boolean {
  if (!profile.consentEnabled) return false;

  const url = profile.consentFormUrl.trim();
  if (!url || url === "TODO_GOOGLE_FORM_URL") return false;

  return url.startsWith("http://") || url.startsWith("https://");
}

import { packagePlans } from "../data/catalog";
import { mockDelay } from "../data/mockDb";

export async function getPackages() {
  await mockDelay();
  return packagePlans;
}

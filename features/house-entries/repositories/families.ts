import type { EnterFamily } from "@/routes/endpoints/families/enter/schema";
import { http } from "@/services/http";

export const enter = async (body: EnterFamily) => {
  const response = await http.families.enter.$post({
    json: body,
  });

  if (!response.ok) {
    throw new Error(
      (await response.json()).message || "おうちに入れませんでした",
    );
  }

  return await response.json();
};

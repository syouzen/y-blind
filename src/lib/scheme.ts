import { z } from "zod";

export const signSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "아이디를 입력해주세요.",
    })
    .max(12, {
      message: "아이디는 12자 이내로 입력해주세요.",
    })
    .regex(/^[a-z0-9_-]+$/, {
      message: "아이디는 영문 소문자, 숫자, _, -만 사용할 수 있습니다.",
    }),
  pw: z
    .string()
    .min(8, {
      message: "비밀번호는 최소 8자 이상이어야 합니다.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
      message:
        "비밀번호는 대문자, 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    }),
});

export const postSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: "내용을 입력해주세요.",
    })
    .max(5000, {
      message: "내용은 5000자 이내로 입력해주세요.",
    }),
});

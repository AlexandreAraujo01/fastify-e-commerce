/* eslint-disable @typescript-eslint/no-explicit-any */
import type { userLoginSchema } from "@fastify-e-commerce/schemas";
import axios from "axios";

export async function signInFunction(data: userLoginSchema) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-in`,
      data,
    );

    return { success: true, data: response.data };
  } catch (error: any) {
    const message = error.response?.data?.message || "Erro inesperado";
    const status = error.response?.status;

    return {
      success: false,
      error: message,
      status,
    };
  }
}

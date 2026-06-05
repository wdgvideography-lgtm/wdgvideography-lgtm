import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  it("accepts valid form submission and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+44 7584 065559",
      service: "basic-service",
      message: "I'd like to book a basic service shoot with WDG.",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects submission with missing first name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        firstName: "",
        email: "john@example.com",
        service: "basic-service",
        message: "A valid message here.",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        firstName: "John",
        email: "not-an-email",
        service: "basic-service",
        message: "A valid message here.",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with unknown service value", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        firstName: "John",
        email: "john@example.com",
        // @ts-expect-error — intentionally testing invalid enum value
        service: "hacked-service",
        message: "A valid message here.",
      })
    ).rejects.toThrow();
  });

  it("rejects message shorter than 10 characters", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        firstName: "John",
        email: "john@example.com",
        service: "basic-service",
        message: "Short",
      })
    ).rejects.toThrow();
  });
});

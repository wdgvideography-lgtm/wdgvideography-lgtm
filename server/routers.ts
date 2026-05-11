import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          firstName: z.string().min(1),
          lastName: z.string().optional().default(""),
          email: z.string().email(),
          phone: z.string().optional().default(""),
          service: z.string().min(1),
          message: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        const serviceLabels: Record<string, string> = {
          "consultation": "Book a Consultation",
          "social-media": "Social Media Management",
          "website-design": "Website Design",
          "content-creation": "Content Creation",
          "brand-building": "Brand Building",
          "basic-service": "Basic Service (From £450)",
          "business-growth": "Business Growth Service (From £650)",
          "bespoke-project": "Bespoke Project (From £1,200)",
        };

        const serviceLabel = serviceLabels[input.service] || input.service;

        const emailContent = [
          `NEW ENQUIRY - ${serviceLabel}`,
          ``,
          `Name: ${input.firstName} ${input.lastName}`.trim(),
          `Email: ${input.email}`,
          input.phone ? `Phone: ${input.phone}` : "",
          `Service: ${serviceLabel}`,
          ``,
          `Message:`,
          input.message,
          ``,
          `---`,
          `Sent from WDG Videography website`,
        ]
          .filter(Boolean)
          .join("\n");

        // Send notification to owner
        await notifyOwner({
          title: `New Enquiry: ${serviceLabel} - ${input.firstName} ${input.lastName}`.trim(),
          content: emailContent,
        });

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;

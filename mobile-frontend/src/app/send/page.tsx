"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Send, UserCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiClient, mockApiClient, useMockData } from "@/lib/api-client";

const formSchema = z.object({
  recipient: z.string().min(3, {
    message: "Recipient must be at least 3 characters.",
  }),
  amount: z.coerce
    .number({ invalid_type_error: "Amount must be a number." })
    .positive({ message: "Amount must be a positive number." })
    .multipleOf(0.01, { message: "Amount can have at most 2 decimal places." }),
  memo: z.string().optional(),
});

// 1. Move the logic into a separate component
function SendPageContent() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastTransactionId, setLastTransactionId] = useState<string | null>(
    null,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient: "",
      amount: undefined,
      memo: "",
    },
  });

  useEffect(() => {
    const recipient = searchParams.get("recipient");
    const amount = searchParams.get("amount");
    const memo = searchParams.get("memo");

    if (recipient) {
      form.setValue("recipient", decodeURIComponent(recipient));
    }
    if (amount) {
      const parsed = parseFloat(amount);
      if (!isNaN(parsed) && parsed > 0) {
        form.setValue("amount", parsed);
      }
    }
    if (memo) {
      form.setValue("memo", decodeURIComponent(memo));
    }
  }, [searchParams, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const client = useMockData ? mockApiClient : apiClient;
      const response = await client.sendPayment({
        recipient: values.recipient,
        amount: values.amount,
        memo: values.memo,
      });

      if (response.success && response.data) {
        const txData = response.data as { transactionId: string };
        setLastTransactionId(txData.transactionId);
        toast.success(
          `Successfully sent $${values.amount.toFixed(2)} to ${values.recipient}!`,
        );
        form.reset();
      } else {
        toast.error(
          response.error?.message || "Failed to send money. Please try again.",
        );
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <Send className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Send Money</h1>
      </div>

      {lastTransactionId && (
        <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-green-800 dark:text-green-300">
              Payment sent!
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-0.5 font-mono">
              Ref: {lastTransactionId}
            </p>
          </div>
        </div>
      )}

      <Card className="rounded-2xl border-border/60 shadow-sm">
        <CardHeader className="pb-3 pt-5 px-5">
          <CardTitle className="text-base font-semibold">
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Recipient
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Username, email, or phone"
                          className="pl-9 rounded-xl h-11 bg-muted/30 border-border/50 focus:border-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      Enter the username, email, or phone number of the
                      recipient.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Amount ($)
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
                          $
                        </span>
                        <Input
                          type="number"
                          step="0.01"
                          min="0.01"
                          placeholder="0.00"
                          className="pl-7 rounded-xl h-11 bg-muted/30 border-border/50 focus:border-primary text-lg font-semibold"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="memo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Memo{" "}
                      <span className="text-muted-foreground font-normal">
                        (Optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What's this payment for?"
                        className="rounded-xl h-11 bg-muted/30 border-border/50 focus:border-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-12 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-md shadow-blue-500/20 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Money
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SendPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <SendPageContent />
    </Suspense>
  );
}

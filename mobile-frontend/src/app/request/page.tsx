"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Landmark, Loader2, RefreshCw, Share2 } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient, mockApiClient, useMockData } from "@/lib/api-client";

const formSchema = z.object({
  amount: z.coerce
    .number({ invalid_type_error: "Amount must be a number." })
    .positive({ message: "Amount must be a positive number." })
    .multipleOf(0.01, { message: "Amount can have at most 2 decimal places." }),
  memo: z.string().optional(),
});

interface RequestData {
  amount: number;
  memo: string;
}

export default function RequestPage() {
  const [qrValue, setQrValue] = useState<string | null>(null);
  const [requestData, setRequestData] = useState<RequestData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
      memo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const client = useMockData ? mockApiClient : apiClient;
      const response = await client.requestPayment({
        amount: values.amount,
        memo: values.memo,
      });

      if (response.success && response.data) {
        const savedRequestData: RequestData = {
          amount: values.amount,
          memo: values.memo || "",
        };
        setRequestData(savedRequestData);

        const paymentDetails = {
          userId: user?.id || "user123",
          amount: values.amount,
          memo: values.memo || "Payment Request",
          timestamp: Date.now(),
        };
        const paymentLink = `paynext://request?details=${encodeURIComponent(JSON.stringify(paymentDetails))}`;
        setQrValue(paymentLink);
        toast.success("Payment request created successfully!");
      } else {
        toast.error(
          response.error?.message || "Failed to create payment request",
        );
      }
    } catch (error) {
      console.error("Request error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  const copyToClipboard = async () => {
    if (!qrValue) return;
    try {
      await navigator.clipboard.writeText(qrValue);
      toast.success("Payment link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy link");
    }
  };

  const handleShare = async () => {
    if (!qrValue || !requestData) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "PayNext Payment Request",
          text: `Please pay me $${requestData.amount.toFixed(2)}${requestData.memo ? ` for ${requestData.memo}` : ""}`,
          url: qrValue,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const handleNewRequest = () => {
    setQrValue(null);
    setRequestData(null);
    form.reset();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <Landmark className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Request Money</h1>
      </div>

      {!qrValue ? (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader className="pb-3 pt-5 px-5">
            <CardTitle className="text-base font-semibold">
              Create Payment Request
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
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
                          placeholder="What's this request for?"
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
                  className="w-full h-12 rounded-xl font-semibold text-sm bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 shadow-md shadow-green-500/20 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate QR Code"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader className="pb-3 pt-5 px-5 text-center">
            <CardTitle className="text-base font-semibold">
              Your Payment Request
            </CardTitle>
            {requestData && (
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                ${requestData.amount.toFixed(2)}
              </p>
            )}
            {requestData?.memo && (
              <p className="text-sm text-muted-foreground">
                {requestData.memo}
              </p>
            )}
          </CardHeader>
          <CardContent className="px-5 pb-3 flex flex-col items-center gap-5">
            <div className="p-4 bg-white rounded-2xl shadow-inner border border-border/40">
              <QRCodeCanvas
                value={qrValue}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#1a1a2e"}
                level={"M"}
                includeMargin={false}
              />
            </div>
            <div className="w-full p-3 bg-muted/50 rounded-xl border border-border/40">
              <p className="text-xs text-muted-foreground break-all font-mono leading-relaxed">
                {qrValue}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2.5 px-5 pb-5">
            <div className="grid grid-cols-2 gap-2.5 w-full">
              <Button
                variant="outline"
                className="rounded-xl h-11 text-sm font-medium border-border/60"
                onClick={copyToClipboard}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
              <Button
                variant="outline"
                className="rounded-xl h-11 text-sm font-medium border-border/60"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            <Button
              variant="ghost"
              className="w-full rounded-xl h-11 text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={handleNewRequest}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

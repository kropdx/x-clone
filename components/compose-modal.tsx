"use client";

import { useState } from "react";
import { X, Globe, Image as ImageIcon, Smile, CalendarDays, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { currentUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ComposeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MAX_CHARS = 280;

export function ComposeModal({ open, onOpenChange }: ComposeModalProps) {
  const [content, setContent] = useState("");

  const charCount = content.length;
  const remaining = MAX_CHARS - charCount;
  const progress = Math.min((charCount / MAX_CHARS) * 100, 100);

  const handleSubmit = () => {
    if (content.trim() && charCount <= MAX_CHARS) {
      setContent("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl gap-0 p-0">
        <VisuallyHidden>
          <DialogTitle>Compose new post</DialogTitle>
        </VisuallyHidden>
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-full p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
          <Button
            variant="ghost"
            size="sm"
            className="text-sky-500 hover:bg-sky-500/10 hover:text-sky-500"
          >
            Drafts
          </Button>
        </div>

        <div className="flex gap-3 p-4">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <Textarea
              placeholder="What is happening?!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] resize-none border-0 bg-transparent p-0 text-xl placeholder:text-zinc-500 focus-visible:ring-0"
            />

            <button className="mt-2 flex items-center gap-1 rounded-full border border-sky-500/50 px-3 py-1 text-sm font-medium text-sky-500 transition-colors hover:bg-sky-500/10">
              <Globe className="h-4 w-4" />
              Everyone can reply
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex gap-1">
            <button className="rounded-full p-2 text-sky-500 transition-colors hover:bg-sky-500/10">
              <ImageIcon className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 text-sky-500 transition-colors hover:bg-sky-500/10">
              <Smile className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 text-sky-500 transition-colors hover:bg-sky-500/10">
              <CalendarDays className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 text-sky-500 transition-colors hover:bg-sky-500/10">
              <MapPin className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {charCount > 0 && (
              <>
                <div className="relative flex h-6 w-6 items-center justify-center">
                  <svg className="h-6 w-6 -rotate-90" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      strokeWidth="2"
                      className="stroke-zinc-200 dark:stroke-zinc-700"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={63}
                      strokeDashoffset={63 - (63 * progress) / 100}
                      className={cn(
                        charCount > MAX_CHARS
                          ? "stroke-rose-500"
                          : charCount > MAX_CHARS - 20
                          ? "stroke-amber-500"
                          : "stroke-sky-500"
                      )}
                    />
                  </svg>
                  {remaining <= 20 && (
                    <span
                      className={cn(
                        "absolute text-xs font-medium",
                        remaining < 0 ? "text-rose-500" : "text-zinc-500"
                      )}
                    >
                      {remaining}
                    </span>
                  )}
                </div>
                <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700" />
              </>
            )}
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || charCount > MAX_CHARS}
              className="rounded-full bg-sky-500 font-bold hover:bg-sky-600 disabled:opacity-50"
            >
              Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

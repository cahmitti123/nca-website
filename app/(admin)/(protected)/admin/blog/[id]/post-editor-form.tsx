"use client";

import * as React from "react";
import { useActionState, useTransition } from "react";

import { IconBold, IconItalic, IconLink, IconPhoto, IconStrikethrough } from "@tabler/icons-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  saveBlogPostAction,
  uploadBlogImageAction,
  type SavePostState,
} from "../actions";

type PostStatus = "draft" | "published" | "archived";

const initialState: SavePostState = { error: null };

export function PostEditorForm(props: {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  status: PostStatus;
  contentHtml: string;
  contentJson: Record<string, unknown> | null;
}) {
  const [state, formAction, isPending] = useActionState(saveBlogPostAction, initialState);

  const [status, setStatus] = React.useState<PostStatus>(props.status);
  const [contentHtml, setContentHtml] = React.useState(props.contentHtml ?? "");
  const [contentJson, setContentJson] = React.useState(
    props.contentJson ? JSON.stringify(props.contentJson) : ""
  );
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [isUploading, startUpload] = useTransition();

  const editor = useEditor({
    // Next.js App Router renders Client Components on the server for the initial
    // HTML. TipTap requires disabling immediate render to avoid hydration mismatch.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          autolink: true,
          linkOnPaste: true,
        },
      }),
      Image,
      Placeholder.configure({
        placeholder: "Write your article…",
      }),
    ],
    content: props.contentJson ?? props.contentHtml ?? "",
    editorProps: {
      attributes: {
        class:
          "min-h-72 rounded-md border bg-background px-3 py-2 text-sm leading-6 outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
      },
    },
    onUpdate({ editor: ed }) {
      setContentHtml(ed.getHTML());
      setContentJson(JSON.stringify(ed.getJSON()));
    },
  });

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  function setLink() {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", previousUrl ?? "");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function triggerImageUpload() {
    fileInputRef.current?.click();
  }

  async function handleFileSelected(file: File) {
    if (!editor) return;
    setUploadError(null);

    const fd = new FormData();
    fd.set("file", file);

    startUpload(() => {
      void (async () => {
        const result = await uploadBlogImageAction(fd);
        if (result.error || !result.url) {
          setUploadError(result.error ?? "Upload failed.");
          return;
        }
        editor.chain().focus().setImage({ src: result.url }).run();
      })();
    });
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={props.id} />
      <input type="hidden" name="status" value={status} />
      <input type="hidden" name="contentHtml" value={contentHtml} />
      <input type="hidden" name="contentJson" value={contentJson} />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={props.title} required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" defaultValue={props.slug} required />
        </div>
        <div className="grid gap-1.5 md:col-span-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            defaultValue={props.excerpt ?? ""}
            className="min-h-20"
          />
        </div>
        <div className="grid gap-1.5 md:col-span-2">
          <Label htmlFor="coverImageUrl">Cover image URL</Label>
          <Input
            id="coverImageUrl"
            name="coverImageUrl"
            defaultValue={props.coverImageUrl ?? ""}
            placeholder="https://…"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <Label className="text-xs">Status</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as PostStatus)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {state.error ? <span className="text-destructive text-xs">{state.error}</span> : null}
          <Button type="submit" size="sm" disabled={isPending}>
            {isPending ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="bg-muted/30 flex flex-wrap items-center gap-1 rounded-md border p-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            aria-pressed={editor?.isActive("bold") ?? false}
          >
            <IconBold />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            aria-pressed={editor?.isActive("italic") ?? false}
          >
            <IconItalic />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            aria-pressed={editor?.isActive("strike") ?? false}
          >
            <IconStrikethrough />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={setLink}
            aria-label="Add link"
          >
            <IconLink />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={triggerImageUpload}
            aria-label="Upload image"
            disabled={isUploading}
          >
            <IconPhoto />
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              if (file) void handleFileSelected(file);
              e.currentTarget.value = "";
            }}
          />
        </div>

        {uploadError ? (
          <p className="text-destructive text-xs">{uploadError}</p>
        ) : null}
      </div>

      <EditorContent editor={editor} />
    </form>
  );
}



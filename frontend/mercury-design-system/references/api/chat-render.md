# @genexus/mercury/components/chat/render.js

Mercury-specific render functions for the Chameleon chat component. Pass these to the chat component’s render slots

## renderItem

```ts
renderItem: {
  actions: ChatActionsRender;
  contentBefore: (message: ChatMessage) => TemplateResult;
  codeBlock: ChatCodeBlockRender;
  content: ChatContentRender;
  file: {
    audio: (file: ChatMessageFile) => TemplateResult;
    video: (file: ChatMessageFile) => TemplateResult;
    image: (file: ChatMessageFile) => TemplateResult;
    file: (file: ChatMessageFile) => TemplateResult;
  };
}
```

- **actions** — Renders action buttons
- **contentBefore** — Renders content before the message body
- **codeBlock** — Renders code blocks with Mercury styling
- **content** — Renders the main message content
- **file** — Renders file attachments (audio, video, image, generic file)

## sendContainerLayout

```ts
sendContainerLayout: ChatSendContainerLayout
```

Layout configuration for the send container. Use with Chameleon chat’s `sendContainerLayout` prop

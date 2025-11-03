# Component Organization

This directory contains all React components organized by functionality and purpose.

## Folder Structure

```
src/components/
├── chat/                    # Chat-related components
│   ├── chat-container.tsx   # Main chat container
│   ├── chat-input.tsx       # Message input with voice/file support
│   ├── chat-message.tsx     # Individual message display
│   ├── chat-pannel.tsx      # Messages panel
│   ├── chat-wrapper.tsx     # Chat wrapper component
│   ├── empty-state.tsx      # Empty chat state
│   └── message-options.tsx  # Message action buttons
├── common/                  # Shared/common components
│   ├── code-block.tsx       # Syntax highlighted code blocks
│   ├── markdown.tsx         # Markdown renderer
│   └── user-account.tsx     # User account dropdown
├── global/                  # Global components and providers
│   ├── container.tsx        # Animation container
│   ├── icons.tsx            # Icon components
│   └── providers.tsx        # Context providers
├── layout/                  # Layout components
│   ├── desktop-header.tsx   # Desktop navigation header
│   ├── footer.tsx           # Page footer
│   ├── main-wrapper.tsx     # Main content wrapper
│   └── mobile-header.tsx    # Mobile navigation header
├── modals/                  # Modal components
│   ├── instructions-modal.tsx    # User instructions modal
│   ├── search-modal.tsx          # Chat search modal
│   ├── settings-modal.tsx        # User settings modal
│   └── share-message-modal.tsx   # Message sharing modal
├── sidebar/                 # Sidebar components
│   ├── chat-list.tsx        # Chat history list
│   ├── desktop-sidebar.tsx  # Desktop sidebar
│   ├── mobile-sidebar.tsx   # Mobile sidebar
│   ├── sidebar-item.tsx     # Individual chat item
│   ├── sidebar-list.tsx     # Sidebar list container
│   └── sidebar.tsx          # Main sidebar component
└── ui/                      # Reusable UI components (shadcn/ui)
    ├── button.tsx
    ├── dialog.tsx
    ├── input.tsx
    └── ... (all other UI primitives)
```

## Organization Principles

1. **Functionality-based grouping**: Components are grouped by their primary purpose
2. **Clear separation**: Layout, chat, sidebar, and modal components are clearly separated
3. **Reusability**: Common components are in the `common/` folder
4. **UI primitives**: All shadcn/ui components remain in the `ui/` folder
5. **Global components**: Shared providers and utilities in `global/`

## Import Patterns

- **Within same folder**: `import Component from "./component"`
- **From different folders**: `import Component from "../folder/component"`
- **UI components**: `import { Button } from "../ui/button"`
- **Global components**: `import Icons from "../global/icons"`

## Benefits

- **Easier navigation**: Find components quickly by functionality
- **Better maintainability**: Related components are grouped together
- **Clearer dependencies**: Import paths show component relationships
- **Scalability**: Easy to add new components in appropriate folders
- **Team collaboration**: Clear structure for multiple developers

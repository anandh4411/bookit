# VisionEngine V2: A Production-Grade Instagram-Like Social Media App

Welcome to **VisionEngine**! This is a full-featured social media web application inspired by Instagram, Facebook, and Google Meet. Think of it as a digital playground where users can share photos and stories, connect with friends, join group discussions, and even hop into video calls with a side chat—all in one place. It's built to handle millions (or billions!) of users, just like the big apps from Meta and Google.

This README is your complete guide—like a storybook for the project. It explains:

- **What each part does** (simple explanations, like for a child).
- **Our entire journey** (discussions, decisions).
- **Tech stack** (tools we use).
- **Why we chose this** (reasons for scalability, learning).
- **Future plans** (what to add next).
- **How to run, build, and extend** (step-by-step for you or AI tools).

If you forget something (or if an AI like Grok/Claude reads this), it has everything to understand and build on top. The app uses **Clean Architecture** (separate brain/logic from body/UI), **Atomic Design** (build UI like Lego: tiny atoms to big pages), and modern Angular 20 features for speed and fun.

The current date is October 16, 2025, and this project is set up with Angular CLI version 20.3.5.

## Project Goals and Features

We're building a social network like Instagram but with video calls like Google Meet. The goal is to learn Angular 20 from 0-100 while creating a professional app. Features include:

- **Login/Signup/Forgot Password**: Secure entry to the app (using Firebase Auth).
- **Feed**: Scroll through posts, add reactions (likes/comments), create new posts.
- **Profiles**: View or edit your own/others' profiles (photo, bio, followers, posts).
- **Friends**: List friends, get suggestions, add/remove friends, search for users.
- **Stories & Explore**: Share temporary photos/videos that expire after 24 hours, and permenent posts in explore.
- **Groups**: List groups, view details (followers, posts), follow/unfollow.
- **Video Call with Side Chat**: Real-time multi-user video calls with text chat (using WebRTC + Firebase signaling), just like google meet.
- **Notifications**: Real-time alerts for reactions, messages, friend requests (using Firebase Cloud Messaging).
- **Search**: Global friend/group search.

**Current Status**: Folder structure created, routes set up, UI shells (atoms, pages) generated. Next: Integrate template designs, then add Firebase and functionalities starting with auth.

## Tech Stack: What Tools Power This?

Like building a rocket: Angular is the body, Firebase the fuel.

- **Frontend Framework**: Angular 20 (standalone components for modularity, signals for reactive state, RxJS for data streams, NgRx for global state management).
- **Architecture**:
  - **Clean Architecture**: Layers like an onion—inner core (domain) is pure logic (no Angular or Firebase), adapters connect to backends/UI, frameworks handle looks. This makes swapping parts easy.
  - **Atomic Design**: UI broken into small atoms (e.g., button), molecules (e.g., reaction bar), organisms (e.g., post card), templates (layouts), pages (full screens).
- **Backend**: Firebase (free Spark plan)—Auth for login, Firestore for data (posts, friends, real-time updates), Storage for images/videos, Cloud Messaging (FCM) for notifications.
- **Video Calls**: WebRTC (browser-to-browser video/audio) + PeerJS library, with Firebase for signaling (e.g., call invites, participant presence).
- **Performance/SEO**: SSR/SSG (Server-Side Rendering) for fast loads and search engine visibility (e.g., prerender profiles).
- **Styling**: SCSS with CSS variables (easy dark/light mode swaps).
- **Other Tools**:
  - Zone.js for change detection.
  - Angular CDK for layouts (e.g., video grid).
  - Animations, pipes (format text like "2h ago"), directives (lazy-load images).
  - Testing: Jasmine/Karma (units), Cypress (e2e).
- **Dependencies**: `@angular/fire` (Firebase), `peerjs` (WebRTC), `@ngrx/store` & `@ngrx/effects` (state).
- **Configs**: .env for secrets (API keys), no traditional environments folder (modern approach).

**Why This Stack?**

- **Beginner-Friendly yet Pro**: Angular teaches everything (components, routing, DI). Firebase = no backend coding, but scales like Google apps.
- **Big-Tech Inspired**: Instagram uses similar (React + GraphQL, but we abstract for swaps). Meta/Google separate logic/UI for teams of 1000s.
- **Portable**: Swap Firebase to custom API (just change repositories). Swap UI designs (update SCSS). Even port to React (reuse domain logic).
- **Free/Scalable**: Firebase free tier for dev, auto-scales to billions. SSR for speed/SEO.

## Our Discussion Journey: How We Got Here

We (you + Grok AI) planned this step-by-step over conversations:

1. **Idea Start**: Build Angular 20 app from scratch to master concepts. Inspired by Instagram (feeds, profiles, stories) + Google Meet (video calls with chat). Use template for UI to save time.
2. **Architecture Choices**: Chose Clean Architecture (layers for separation) over feature-based folders—makes backend/UI swaps easy (e.g., Firebase to custom API in hours, not weeks). Added Atomic Design for UI (Lego-style building).
3. **Structure Debates**: Rejected zoneless (unstable for real-time), enabled SSR/SSG for speed/SEO. Used standalone components (Angular 20). Folders: Domain for logic, adapters for connections, frameworks for UI.
4. **Customizations**: .env for configs (modern, secure). Naming suffixes (.usecase.ts, .directive.ts) for IDE icons. Separate HTML/SCSS for pages/organisms (easy template pasting).
5. **Routes Setup**: Lazy-loaded with guards (auth-protected, like /feed only for logged-in).
6. **Firebase Focus**: No custom backend (saves time)—Firebase for everything, abstracted in repositories.
7. **UI Plan**: Atoms inline (simple), pages/organisms with folders + separate files (complex templates).
8. **SSR Files**: Explained new files (app.config.server.ts, etc.) from Angular 20 SSR—boost performance.
9. **Learning Focus**: Covers all Angular 20 (signals, RxJS, NgRx, etc.) in production way.

**Key Decisions**:

- Clean Arch: Backend/UI agnostic (swap easily).
- No Zoneless: Stable change detection.
- SSR: Fast loads/SEO.
- .env: Secure keys.
- Why? Scale to billions, learn pro patterns, easy future changes.

## Folder Structure: Explained Like to a Child (With Current Tree)

The code is like a big house with rooms for different jobs. Each folder is a room, each file is a tool or note. Here's the current tree (your setup):

```
.
├── README.md  # This guide - why: Document everything for you/AI; place: Root for quick access.
├── angular.json  # CLI blueprint - why: Build/deploy settings (e.g., SSR); place: Root config.
├── package-lock.json  # Locked dependencies - why: Exact versions for consistency; auto-generated.
├── package.json  # Tool list - why: Dependencies/scripts (e.g., "ng serve"); place: Root, add libs here.
├── public
│   └── favicon.ico  # App icon - why: Browser tab icon; place: Static assets.
├── src
│   ├── app  # Main app code - why: All logic/UI; place: Custom code here.
│   │   ├── adapters  # Connector layer - why: Links domain to external (Firebase/UI), Clean Arch middle; place: Repos/presenters/state for data flows.
│   │   │   ├── presenters  # Data formatters - why: Shape data for UI (e.g., add timestamps); place: One per feature (feed.presenter.ts - format posts).
│   │   │   │   ├── call.presenter.ts  # Formats call data - why: For video-call page.
│   │   │   │   ├── feed.presenter.ts  # Formats feed - why: Prepare posts for display.
│   │   │   │   ├── friends.presenter.ts  # Friends data - why: List formatting.
│   │   │   │   ├── groups.presenter.ts  # Groups data - why: Group details.
│   │   │   │   ├── notification.presenter.ts  # Alerts formatting - why: Toast messages.
│   │   │   │   ├── profile.presenter.ts  # Profile data - why: Bio/posts prep.
│   │   │   │   └── stories.presenter.ts  # Stories formatting - why: Expire timers.
│   │   │   ├── repositories  # Data access abstracts - why: Interfaces/impl for backend; place: Interfaces here, Firebase in subfolder.
│   │   │   │   ├── auth.repository.ts  # Auth interface - why: Define login methods, swap backends.
│   │   │   │   ├── call.repository.ts  # Call interface - why: Video signaling.
│   │   │   │   ├── feed.repository.ts  # Feed interface - why: Post CRUD.
│   │   │   │   ├── firebase  # Firebase impls - why: Actual backend code; place: One per feature.
│   │   │   │   │   ├── firebase-auth.ts  # Firebase login - why: Use AngularFire.
│   │   │   │   │   ├── firebase-call.ts  # Calls via Firebase.
│   │   │   │   │   ├── firebase-feed.ts  # Posts in Firestore.
│   │   │   │   │   ├── firebase-friends.ts  # Friends list.
│   │   │   │   │   ├── firebase-groups.ts  # Groups.
│   │   │   │   │   ├── firebase-notification.ts  # FCM.
│   │   │   │   │   ├── firebase-profile.ts  # Profiles.
│   │   │   │   │   └── firebase-stories.ts  # Stories.
│   │   │   │   ├── friends.repository.ts  # Friends interface.
│   │   │   │   ├── groups.repository.ts  # Groups interface.
│   │   │   │   ├── notification.repository.ts  # Notifications interface.
│   │   │   │   ├── profile.repository.ts  # Profile interface.
│   │   │   │   └── stories.repository.ts  # Stories interface.
│   │   │   └── state  # NgRx state - why: Global store for app data; place: Per feature folders (add actions/effects).
│   │   │       ├── auth  # Auth state - why: Track login.
│   │   │       │   ├── auth.actions.ts  # Events (e.g., login).
│   │   │       │   ├── auth.effects.ts  # Side effects (API calls).
│   │   │       │   ├── auth.reducer.ts  # Update state.
│   │   │       │   └── auth.selectors.ts  # Read state.
│   │   │       ├── call  # Empty now - why: For call state; add files later.
│   │   │       ├── feed  # Feed state.
│   │   │       ├── friends  # Friends state.
│   │   │       ├── groups  # Groups state.
│   │   │       ├── notification  # Notifications state.
│   │   │       ├── profile  # Profile state.
│   │   │       └── stories  # Stories state.
│   │   ├── app.config.server.ts  # Server config - why: SSR providers; place: Merge with app.config.
│   │   ├── app.config.ts  # App providers - why: Routes, Firebase init; place: DI setup.
│   │   ├── app.html  # Root template - why: <router-outlet>; place: Global layout.
│   │   ├── app.routes.server.ts  # SSR routes - why: Prerender for SEO.
│   │   ├── app.routes.ts  # Routes map - why: Navigation; place: Lazy loads.
│   │   ├── app.scss  # Root styles - why: Global CSS vars.
│   │   ├── app.spec.ts  # Root test - why: App bootstrap test.
│   │   ├── app.ts  # Root component - why: Shell with signals.
│   │   ├── core  # Shared helpers - why: Reusable across app; place: Guards/interceptors.
│   │   │   ├── directives  # HTML superpowers - why: Custom behaviors.
│   │   │   │   ├── hover.directive.spec.ts  # Test.
│   │   │   │   ├── hover.directive.ts  # Hover effects - why: CSS on hover.
│   │   │   │   ├── lazy-image.directive.spec.ts  # Test.
│   │   │   │   ├── lazy-image.directive.ts  # Lazy load images - why: Performance.
│   │   │   │   ├── virtual-scroll.directive.spec.ts  # Test.
│   │   │   │   └── virtual-scroll.directive.ts  # Smooth lists - why: Infinite feed.
│   │   │   ├── guards  # Route protectors.
│   │   │   │   ├── auth.guard.ts  # Check login - why: Protect pages.
│   │   │   │   └── can-deactivate.guard.ts  # Unsaved changes warn.
│   │   │   ├── interceptors  # HTTP modifiers.
│   │   │   │   ├── auth.interceptor.ts  # Add tokens.
│   │   │   │   ├── cache.interceptor.ts  # Cache responses.
│   │   │   │   └── retry.interceptor.ts  # Retry fails.
│   │   │   ├── pipes  # Text transformers.
│   │   │   │   ├── time-ago.pipe.spec.ts  # Test.
│   │   │   │   ├── time-ago.pipe.ts  # "2h ago" - why: Readable times.
│   │   │   │   ├── truncate.pipe.spec.ts  # Test.
│   │   │   │   └── truncate.pipe.ts  # Shorten text.
│   │   │   └── services  # Global helpers.
│   │   │       ├── analytics.service.ts  # Track events - why: Usage stats.
│   │   │       └── error.service.ts  # Log errors.
│   │   ├── domain  # Pure brain - why: Business logic, no deps; place: Entities/usecases first.
│   │   │   ├── entities  # Data models - why: Shapes like User/Post.
│   │   │   │   ├── call.entity.ts  # Call model.
│   │   │   │   ├── group.entity.ts  # Group model.
│   │   │   │   ├── notification.entity.ts  # Alert model.
│   │   │   │   ├── post.entity.ts  # Post model.
│   │   │   │   ├── story.entity.ts  # Story model.
│   │   │   │   └── user.entity.ts  # User model.
│   │   │   └── usecases  # Business actions - why: Orchestrate repos; place: Injectable classes.
│   │   │       ├── auth  # Auth logic.
│   │   │       │   ├── forgot-password.usecase.ts  # Reset flow.
│   │   │       │   ├── login.usecase.ts  # Login logic.
│   │   │       │   └── signup.usecase.ts  # Signup logic.
│   │   │       ├── feed  # Feed actions.
│   │   │       │   ├── create-post.usecase.ts  # Add post.
│   │   │       │   ├── get-feed.usecase.ts  # Fetch posts.
│   │   │       │   └── react-to-post.usecase.ts  # Like/comment.
│   │   │       ├── friends  # Friends actions.
│   │   │       │   ├── add-friend.usecase.ts
│   │   │       │   ├── get-friends.usecase.ts
│   │   │       │   └── search-friends.usecase.ts
│   │   │       ├── groups
│   │   │       │   ├── follow-group.usecase.ts
│   │   │       │   ├── get-group-detail.usecase.ts
│   │   │       │   └── get-groups.usecase.ts
│   │   │       ├── notification
│   │   │       │   └── send-notification.usecase.ts
│   │   │       ├── profile
│   │   │       │   ├── get-profile.usecase.ts
│   │   │       │   └── update-profile.usecase.ts
│   │   │       ├── stories
│   │   │       │   ├── create-story.usecase.ts
│   │   │       │   └── get-stories.usecase.ts
│   │   │       └── video-call
│   │   │           ├── join-call.usecase.ts
│   │   │           ├── send-message.usecase.ts
│   │   │           └── start-call.usecase.ts
│   │   ├── frameworks  # Outer layer - why: Tech-specific (Angular/UI); place: Drivers/UI.
│   │   │   ├── drivers  # External integrations - why: Firebase/theme wrappers.
│   │   │   │   ├── firebase
│   │   │   │   │   ├── firebase-config.driver.ts  # Init Firebase.
│   │   │   │   │   └── webrtc.driver.ts  # WebRTC setup.
│   │   │   │   └── theme
│   │   │   │       ├── theme.config.driver.ts  # Theme options.
│   │   │   │       └── theme.driver.ts  # Switch modes.
│   │   │   └── ui  # Visuals - why: Atomic components; place: Paste templates here.
│   │   │       ├── atoms  # Tiny UI (inline) - why: Reusable basics.
│   │   │       │   ├── avatar  # Photo circle.
│   │   │       │   │   ├── avatar.spec.ts
│   │   │       │   │   └── avatar.ts
│   │   │       │   ├── button  # Clickable.
│   │   │       │   │   ├── button.spec.ts
│   │   │       │   │   └── button.ts
│   │   │       │   ├── input  # Text field.
│   │   │       │   │   ├── input.spec.ts
│   │   │       │   │   └── input.ts
│   │   │       │   ├── video  # Video player.
│   │   │       │   │   ├── video.spec.ts
│   │   │       │   │   └── video.ts
│   │   │       ├── molecules  # Combined atoms.
│   │   │       │   ├── chat-input  # Input + send.
│   │   │       │   │   ├── chat-input.spec.ts
│   │   │       │   │   └── chat-input.ts
│   │   │       │   ├── notification  # Alert box.
│   │   │       │   ├── profile-header  # Bio bar.
│   │   │       │   ├── reaction  # Likes bar.
│   │   │       │   └── search  # Search bar.
│   │   │       ├── organisms  # Complex UI (folders) - why: Full cards, paste templates in .html/.scss.
│   │   │       │   ├── friend-card  # Friend tile.
│   │   │       │   │   ├── friend-card.html  # Template paste here.
│   │   │       │   │   ├── friend-card.scss  # Styles.
│   │   │       │   │   ├── friend-card.spec.ts
│   │   │       │   │   └── friend-card.ts  # Logic.
│   │   │       │   ├── group-card  # Similar for groups.
│   │   │       │   ├── post-card  # Post display.
│   │   │       │   ├── profile  # Profile section.
│   │   │       │   ├── sidebar  # Nav menu.
│   │   │       │   ├── story-card  # Story tile.
│   │   │       │   └── video-call  # Call UI.
│   │   │       ├── pages  # Full routes - why: Lazy loaded, paste full screens.
│   │   │       │   ├── feed  # Home page.
│   │   │       │   │   ├── feed.page.html  # HTML paste.
│   │   │       │   │   ├── feed.page.scss
│   │   │       │   │   ├── feed.page.spec.ts
│   │   │       │   │   └── feed.page.ts
│   │   │       │   ├── forgot-password  # Similar pattern for all pages.
│   │   │       │   ├── friends
│   │   │       │   ├── group-detail
│   │   │       │   ├── groups-list
│   │   │       │   ├── login
│   │   │       │   ├── profile
│   │   │       │   ├── search
│   │   │       │   ├── signup
│   │   │       │   ├── stories
│   │   │       │   └── video-call
│   │   │       └── templates  # Layout components - why: Shared shells.
│   │   │           ├── auth  # Auth layout.
│   │   │           │   ├── auth.html
│   │   │           │   ├── auth.scss
│   │   │           │   ├── auth.spec.ts
│   │   │           │   └── auth.ts
│   │   │           └── feed  # Feed layout.
│   │   ├── assets  # Static files - why: Images/styles.
│   │   │   ├── images  # Icons/photos - place: Add custom.
│   │   │   └── styles
│   │   │       ├── global.scss  # Imports - why: App-wide CSS.
│   │   │       └── variables.scss  # Colors/vars - why: Themes.
│   │   ├── index.html  # Entry HTML - why: Bootstrap.
│   │   ├── main.server.ts  # SSR boot - why: Server render.
│   │   ├── main.ts  # Client boot - why: Browser start.
│   │   ├── server.ts  # Express server - why: SSR handling.
│   │   ├── styles.scss  # Legacy global.
│   │   └── tests  # Test folders - why: Mirror structure for tests.
│       ├── atoms
│       ├── molecules
│       ├── organisms
│       ├── pages
│       └── usecases
├── tsconfig.app.json  # App TS config.
├── tsconfig.json  # Base TS.
└── tsconfig.spec.json  # Test TS.

```



Now, let's explain every folder and file like to a child: The app is a big house. Folders are rooms, files are toys/notes. Clean Architecture is like the house blueprint—inner rooms (domain) are the brain (pure thinking, no tech), middle rooms (adapters) connect brain to tools (backend/UI), outer rooms (frameworks) are the face (what you see). This keeps the house strong, easy to fix, and changeable (swap rooms without breaking).

- **src/app**: Main house.
  - **adapters**: Connector rooms—links brain to world.
    - **presenters**: Artists—format data pretty for UI (e.g., feed.presenter.ts turns raw posts into nice views for feed page).
    - **repositories**: Messengers—how to get/save data (e.g., auth.repository.ts = interface "how to login", firebase/firebase-auth.ts = "use Firebase to login").
    - **state**: Notebook rooms—NgRx state (e.g., auth/auth.actions.ts = "login success note", effects.ts = auto-updates, reducer.ts = changes notebook, selectors.ts = reads notes).
  - **app.config.server.ts**: Server settings (SSR config for fast loads on server).
  - **app.config.ts**: Main settings (providers like routes, Firebase).
  - **app.html**: Root look (whole app template, with <router-outlet> for pages).
  - **app.routes.server.ts**: Server map (prerender routes for SSG).
  - **app.routes.ts**: App map (paths like /feed).
  - **app.scss**: Root style (global CSS).
  - **app.spec.ts**: Test for root.
  - **app.ts**: Root boss (App component, with signals for title).
  - **core**: Helper tools room.
    - **directives**: Superpowers (hover.directive.ts = hover effects, lazy-image.directive.ts = load images lazy, virtual-scroll.directive.ts = smooth scrolling).
    - **guards**: Door locks (auth.guard.ts = check login, can-deactivate.guard.ts = warn unsaved changes).
    - **interceptors**: Mail filters (auth.interceptor.ts = add tokens, cache.interceptor.ts = save responses, retry.interceptor.ts = try again on fails).
    - **pipes**: Formatters (time-ago.pipe.ts = "2h ago", truncate.pipe.ts = shorten text).
    - **services**: Helpers (analytics.service.ts = track clicks, error.service.ts = log problems).
  - **domain**: Brain room—pure logic, no tech.
    - **entities**: Models (user.entity.ts = person with name/bio, post.entity.ts = photo with likes).
    - **usecases**: Actions (auth/login.usecase.ts = "check password", feed/get-feed.usecase.ts = "fetch posts").
  - **frameworks**: Face/body room—shows stuff.
    - **drivers**: Gadgets (firebase/firebase-config.driver.ts = start Firebase, webrtc.driver.ts = video call tool, theme/theme.driver.ts = switch colors).
    - **ui**: Drawing room (Atomic Design).
      - **atoms**: Tiny pieces (avatar.ts = photo, button.ts = click button).
      - **molecules**: Combined pieces (reaction.ts = like button + count).
      - **organisms**: Big pieces (post-card.ts/html/scss = full post with image/reactions).
      - **pages**: Full screens (feed.page.ts/html/scss = home feed).
      - **templates**: Layouts (auth.html = login layout).
  - **assets**: Treasure chest (images/ = photos, styles/global.scss = app looks, variables.scss = color palette).
  - **index.html**: Front door (main HTML with <app-root>).
  - **main.server.ts**: Server start (SSR bootstrap).
  - **main.ts**: App start (browser bootstrap).
  - **server.ts**: Server engine (Express for SSR, serves pages fast).
  - **styles.scss**: Global style sheet.
  - **tests**: Check room (atoms/ = test tiny pieces, pages/ = test screens).

- **Root Files**: Outside house.
  - **README.md**: This guide.
  - **angular.json**: CLI blueprint (build settings).
  - **package-lock.json/package.json**: Tool list (dependencies like Angular/Fire).
  - **public/favicon.ico**: App icon.
  - **tsconfig.app.json**: App TypeScript rules.
  - **tsconfig.json**: Global TypeScript rules.
  - **tsconfig.spec.json**: Test TypeScript rules.

**Clean Architecture Explained (0-100)**: Like a castle—inner keep (domain) is safe logic (pure TS, no Firebase/UI). Gateways (adapters) connect to outside (Firebase, UI). Outer walls (frameworks) show the view. Dependencies go inward—makes swapping (backend/UI) easy, testing simple, scaling strong. Why? Avoids mess (e.g., logic not mixed with buttons). For AI: Use domain for core, adapters for swaps, frameworks for looks.

## Future Plans: What's Next and How to Extend
1. **Immediate**: Paste template HTML/CSS into pages/organisms (e.g., post-card.html). Add Firebase repos. Implement auth first (LoginUsecase + FirebaseAuth).
2. **Medium**: Real-time (Firestore listeners in effects). Video call (WebRTC in video-call.page).
3. **Long**: Swap backend (custom repos), add AI (photo filters), mobile (Ionic), deploy (Firebase Hosting).
4. **How to Extend**: New feature (e.g., Messages): Add usecase (domain/usecases/messages/send-message.usecase.ts), repo (adapters/repositories/messages.repository.ts), page (frameworks/ui/pages/messages.page.ts/html/scss).
5. **For AI Tools**: Feed this README—ask "Add payments: Create PaymentsUsecase and PaymentsPage".

## How to Run and Develop
1. **Install**: `npm install`.
2. **Env**: Add keys to .env (FIREBASE_API_KEY=xxx).
3. **Serve**: `ng serve` (localhost:4200).
4. **SSR Test**: `npm run build:ssr && npm run serve:ssr`.
5. **Build**: `ng build` (dist/ folder).
6. **Test**: `ng test` (units), `ng e2e` (end-to-end).
7. **Generate**: `ng g component frameworks/ui/organisms/new-thing --standalone --inline-style --inline-template`.
8. **Deploy**: `firebase init`, `firebase deploy`.

Tips: Use VS Code icons for files. Debug with console. Commit often. For questions, read journey section.

Let's build the next Instagram! 🚀

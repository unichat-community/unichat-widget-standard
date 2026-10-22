/********************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type { UniChatBadge, UniChatEmote } from "@voguh/unichat-api/widgets/events";

import { ENTRY_ANIMATION, EXIT_ANIMATION, SHOW_AVATAR } from "~/fields";
import { createElement } from "~/utils/createElement";
import { isBlank } from "~/utils/strings";

import styles from "./styles.module.css";

export interface BaseCardData {
    messageId: string;
    authorId: string;
    authorDisplayName: string;
    authorDisplayColor: string;
    authorProfilePictureUrl: string | null;
    authorBadges: UniChatBadge[];
}

function hashHue(value: string): number {
    let hash = 0;
    for (const char of value) {
        hash = (hash * 31 + char.charCodeAt(0)) % 360;
    }

    return hash;
}

export abstract class BaseCard<T extends BaseCardData = BaseCardData> extends HTMLElement {
    private leaving = false;

    protected readonly data: T;

    /* ====================================================================== */

    public get isLeaving(): boolean {
        return this.leaving;
    }

    /* ====================================================================== */

    constructor(data: T) {
        super();
        this.data = data;
    }

    /* ====================================================================== */

    public connectedCallback(): void {
        this.dataset.messageId = this.data.messageId;
        this.dataset.authorId = this.data.authorId;
        this.classList.add(styles.card);

        if (ENTRY_ANIMATION !== "none") {
            this.classList.add("animate__animated", `animate__${ENTRY_ANIMATION}`, styles.entering);
        }

        if (SHOW_AVATAR) {
            this.append(this.renderAvatar());
        }

        this.append(createElement("div", styles.bubble, [this.renderPill(), this.renderHead(), this.renderBody()]));
    }

    public leave(): void {
        if (this.leaving) {
            return;
        }

        this.leaving = true;
        if (EXIT_ANIMATION === "none") {
            this.remove();
            return;
        }

        this.classList.remove(`animate__${ENTRY_ANIMATION}`, styles.entering);
        this.classList.add("animate__animated", `animate__${EXIT_ANIMATION}`, styles.leaving);
        this.addEventListener("animationend", () => this.remove(), { once: true });
    }

    protected abstract renderBody(): HTMLElement | null;

    protected renderPill(): HTMLElement | null {
        return null;
    }

    protected createIcon(iconClass: string): HTMLElement | null {
        if (!isBlank(iconClass)) {
            return createElement("i", iconClass);
        }

        return null;
    }

    protected createPill(iconClass: string, text: string): HTMLElement {
        return createElement("div", styles.pill, [this.createIcon(iconClass), text]);
    }

    protected createMessage(text: string, emotes: UniChatEmote[]): HTMLElement {
        const emoteUrls = new Map(emotes.map((emote) => [emote.code, emote.url]));
        const nodes: Node[] = [];

        const tokens = text.split(" ");
        for (let index = 0; index < tokens.length; index++) {
            const token = tokens[index];
            if (index > 0) {
                nodes.push(document.createTextNode(" "));
            }

            const url = emoteUrls.get(token);
            if (url == null) {
                nodes.push(document.createTextNode(token));
                continue;
            }

            const emote = createElement("img", styles.emote);
            emote.src = url;
            emote.alt = token;
            nodes.push(emote);
        }

        return createElement("div", "", nodes);
    }

    protected createSticker(url: string): HTMLElement {
        const sticker = createElement("img", styles.sticker);
        sticker.src = url;

        return sticker;
    }

    protected findEmoteUrl(emotes: UniChatEmote[], code: string): string | null {
        for (const emote of emotes) {
            if (emote.code === code) {
                return emote.url;
            }
        }

        return null;
    }

    private renderAvatar(): HTMLElement {
        const { authorId, authorDisplayName, authorProfilePictureUrl } = this.data;

        if (!isBlank(authorProfilePictureUrl)) {
            const image = createElement("img", styles.avatar);
            image.src = authorProfilePictureUrl;
            return image;
        }

        const initial = authorDisplayName.charAt(0).toUpperCase();
        const avatar = createElement("span", `${styles.avatar} ${styles.initial}`, [initial]);
        avatar.style.backgroundColor = `hsl(${hashHue(authorId)} 70% 72%)`;

        return avatar;
    }

    private renderHead(): HTMLElement {
        const badges = this.data.authorBadges.map((badge) => {
            const image = createElement("img", styles.badge);
            image.src = badge.url;
            image.alt = badge.code;
            return image;
        });

        const name = createElement("span", styles.name, [this.data.authorDisplayName]);
        name.style.color = this.data.authorDisplayColor;

        return createElement("div", styles.head, [...badges, name]);
    }
}

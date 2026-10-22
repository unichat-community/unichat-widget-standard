/********************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type { UniChatEventMessage } from "@voguh/unichat-api/widgets/events";

import { BaseCard, type BaseCardData } from "~/components/BaseCard";
import { IGNORE_COMMANDS, IGNORED_USERS, STREAK_ENABLED, STREAK_ICON, STREAK_MESSAGE, STREAK_MIN_DAYS } from "~/fields";
import { fillTemplate, isBlank } from "~/utils/strings";

import styles from "./styles.module.css";

type MessageCardData = BaseCardData &
    Pick<
        UniChatEventMessage["data"],
        "platform" | "authorUsername" | "authorType" | "messageText" | "emotes" | "flags"
    >;

const IGNORED_USERNAMES = IGNORED_USERS.split(",")
    .map((username) => username.trim().toLowerCase())
    .filter((username) => username !== "");

function resolveStreakDays(flags: Record<string, string | null>): number | null {
    const days = parseInt(flags["unichat:twitch_streak_days"] ?? "", 10);
    if (STREAK_ENABLED && days >= STREAK_MIN_DAYS) {
        return days;
    }

    return null;
}

class MessageCard extends BaseCard<MessageCardData> {
    private readonly streakDays = resolveStreakDays(this.data.flags);

    /* ====================================================================== */

    public connectedCallback(): void {
        super.connectedCallback();

        if (this.streakDays != null) {
            this.classList.add(styles.streak);
        }
    }

    protected renderPill(): HTMLElement | null {
        if (this.streakDays == null) {
            return null;
        }

        const text = fillTemplate(STREAK_MESSAGE, { ...this.data, streakDays: this.streakDays });
        return this.createPill(STREAK_ICON, text);
    }

    protected renderBody(): HTMLElement {
        const { platform, messageText, emotes, flags } = this.data;

        if (platform === "twitch" && "unichat:twitch_gif" in flags) {
            return this.createSticker(this.findEmoteUrl(emotes, messageText)!);
        }

        return this.createMessage(messageText, emotes);
    }
}

customElements.define("uc-message-card", MessageCard);

export function handleMessageEvent(
    data: Omit<MessageCardData, "messageText"> & { messageText: string | null }
): BaseCard | null {
    const { authorUsername, messageText } = data;
    if (authorUsername != null && IGNORED_USERNAMES.includes(authorUsername.toLowerCase())) {
        return null;
    }

    if (!isBlank(messageText) && !(IGNORE_COMMANDS && messageText.startsWith("!"))) {
        return new MessageCard({ ...data, messageText: messageText });
    }

    return null;
}

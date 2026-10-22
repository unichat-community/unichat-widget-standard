/********************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type { UniChatEventRaid } from "@voguh/unichat-api/widgets/events";

import { BaseCard } from "~/components/BaseCard";
import { RAID_ENABLED, RAID_ICON, RAID_MESSAGE_WITH_VIEWERS, RAID_MESSAGE_WITHOUT_VIEWERS } from "~/fields";
import { fillTemplate } from "~/utils/strings";

import styles from "./styles.module.css";

class RaidCard extends BaseCard<UniChatEventRaid["data"]> {
    public connectedCallback(): void {
        super.connectedCallback();
        this.classList.add(styles.raid);
    }

    protected renderPill(): HTMLElement {
        if (this.data.viewerCount != null) {
            return this.createPill(RAID_ICON, fillTemplate(RAID_MESSAGE_WITH_VIEWERS, this.data));
        }

        return this.createPill(RAID_ICON, fillTemplate(RAID_MESSAGE_WITHOUT_VIEWERS, this.data));
    }

    protected renderBody(): null {
        return null;
    }
}

customElements.define("uc-raid-card", RaidCard);

export function handleRaidEvent(data: UniChatEventRaid["data"]): BaseCard | null {
    if (RAID_ENABLED) {
        return new RaidCard(data);
    }

    return null;
}

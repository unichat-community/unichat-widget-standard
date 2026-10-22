/********************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { createElement } from "~/utils/createElement";

import styles from "./styles.module.css";

function createEdge(iconClass: string, positionClass: string): HTMLElement {
    const arrow = createElement("span", styles.arrow, [createElement("i", iconClass)]);
    return createElement("div", `${styles.edge} ${positionClass}`, [arrow]);
}

export class ScrollArea extends HTMLElement {
    private stickToBottom = true;

    public readonly content = createElement("div", styles.content);
    private readonly viewport = createElement("div", styles.viewport, [this.content]);
    private readonly edgeTop = createEdge("fas fa-chevron-up", styles.top);
    private readonly edgeBottom = createEdge("fas fa-chevron-down", styles.bottom);

    /* ====================================================================== */

    public connectedCallback(): void {
        this.classList.add(styles.scrollArea);
        this.append(this.viewport, this.edgeTop, this.edgeBottom);

        this.viewport.addEventListener("scroll", () => this.onScroll());

        const resizeObserver = new ResizeObserver(() => this.onResize());
        resizeObserver.observe(this.viewport);
        resizeObserver.observe(this.content);
    }

    private onScroll(): void {
        const { scrollTop, scrollHeight, clientHeight } = this.viewport;
        this.stickToBottom = scrollHeight - scrollTop - clientHeight < 1;
        this.updateEdges();
    }

    private onResize(): void {
        if (this.stickToBottom) {
            this.viewport.scrollTop = this.viewport.scrollHeight;
        }

        this.updateEdges();
    }

    private updateEdges(): void {
        const { scrollTop, scrollHeight, clientHeight } = this.viewport;
        this.edgeTop.classList.toggle(styles.visible, scrollTop > 0);
        this.edgeBottom.classList.toggle(styles.visible, scrollHeight - scrollTop - clientHeight >= 1);
    }
}

customElements.define("uc-scroll-area", ScrollArea);

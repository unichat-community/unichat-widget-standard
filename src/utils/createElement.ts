/********************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

export function createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    className: string,
    children: (Node | string | null)[] = []
): HTMLElementTagNameMap[K] {
    const element = document.createElement(tagName);
    element.className = className;
    element.append(...children.filter((child) => child != null));

    return element;
}

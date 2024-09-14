class IdTabsAnchor {
    element: HTMLAnchorElement;
    targetId: string;
    uuid: string;

    constructor(element: HTMLAnchorElement) {
        this.element = element;
        this.targetId = this.getTargetIdFromAnchor(element);
        this.uuid = crypto.randomUUID();
    }

    getTargetIdFromAnchor(aTag: HTMLAnchorElement): string {
        const targetId = aTag.hash.replace('#', '');
        return targetId;
    }

    isSelected(): boolean {
        return this.element.classList.contains('selected');
    }

    select(): void {
        this.element.classList.add('selected');
    }

    deselect(): void {
        this.element.classList.remove('selected');
    }
}

class IdTabsContent {
    element: HTMLElement;
    id: string;

    constructor(element: HTMLElement) {
        this.element = element;
        this.id = element.id;
    }

    show(): void {
        this.element.style.display = 'block';
    }

    hide(): void {
        this.element.style.display = 'none';
    }
}

class IdTabs {
    static instances: IdTabs[] = [];
    private tabAnchors: IdTabsAnchor[] = [];
    private tabContents: IdTabsContent[] = [];

    constructor(selectorOrNode: string | HTMLElement) {
        let tabListParentList: HTMLElement[] = [];

        if (typeof selectorOrNode === 'string') {
            tabListParentList = Array.from(document.querySelectorAll<HTMLElement>(selectorOrNode));
        } else if (selectorOrNode instanceof HTMLElement) {
            tabListParentList.push(selectorOrNode);
        }

        // If the selector didn't return any elements, we don't need to do anything
        if (tabListParentList.length === 0) return;

        if (tabListParentList.length > 1) {
            tabListParentList.forEach(tabListParent => {
                // We need recursion to suport broad selectors
                new IdTabs(tabListParent);
            });
            return;
        }

        // If we reached this point, we have a single tab list parent
        const anchorList: HTMLAnchorElement[] = Array.from(
            tabListParentList[0].querySelectorAll('a')
        );

        // The list doesn't contain any anchors, we don't need to do anything
        if (anchorList.length === 0) return;

        this.tabAnchors = Array.from(anchorList)
            .map(aTag => new IdTabsAnchor(aTag))
            .filter(anchor => anchor.targetId && document.getElementById(anchor.targetId));
        this.tabContents = [];

        // No anchors with valid targets, we don't need to do anything
        if (this.tabAnchors.length === 0) return;

        // We've passed all checks, save this instance in the global array and continue execution
        IdTabs.instances.push(this);

        // Get the tab contents
        this.tabAnchors.forEach(anchor => {
            const contentElement = document.getElementById(anchor.targetId);

            if (contentElement) {
                this.tabContents.push(new IdTabsContent(contentElement));
            }
        });

        // Activate default tab
        const defaultTab: IdTabsAnchor | undefined = this.tabAnchors.find(anchor =>
            anchor.isSelected()
        );
        if (defaultTab) {
            this.selectTab(defaultTab.targetId, defaultTab.uuid);
        } else {
            const { targetId, uuid } = this.tabAnchors[0];
            this.selectTab(targetId, uuid);
        }

        // Add event listener to each tab link
        this.tabAnchors.forEach(anchor => {
            anchor.element.addEventListener('click', e => {
                e.preventDefault();
                this.selectTab(anchor.targetId, anchor.uuid);
            });
        });
    }

    private selectTab(tabId: string, uuid: string): void {
        this.tabAnchors.forEach(anchor => {
            if (anchor.targetId === tabId && anchor.uuid === uuid) {
                anchor.select();
            } else {
                anchor.deselect();
            }
        });

        this.tabContents.forEach(content => {
            if (content.id === tabId) {
                content.show();
            } else {
                content.hide();
            }
        });
    }
}

// Default automatic initialization
window.addEventListener('load', () => {
    new IdTabs('.idTabs');
});

export default IdTabs;

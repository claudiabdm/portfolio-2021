import { gsap } from 'gsap';

export function elasticAnimation(
    target: gsap.TweenTarget,
    x: number,
    y: number,
    duration: number,
    delay: number,
    stagger: number
): gsap.core.Timeline {
    const tl = gsap.timeline({
        defaults: { ease: 'elastic', duration, delay },
    });
    tl.set(target, {
        x: 0,
        y: 0,
    });
    tl.to(target, {
        opacity: 1,
        duration: 0,
    });
    tl.to(target, {
        x,
        y,
        clearProps: 'all',
        stagger: {
            amount: stagger,
        },
    });
    return tl;
};

function createElevateObserver(
    timeline: gsap.core.Timeline
): IntersectionObserver {
    return new IntersectionObserver(
        (entries: IntersectionObserverEntry[]): void => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    timeline.play();
                } else {
                    timeline.reverse();
                }
            }
        },
        {
            threshold: 1,
        }
    );
}

function levelUpAnimation(
    elem: Element,
    position: number | string,
): gsap.core.Tween {
    return gsap.to(elem, {
        x: position,
        y: position,
        ease: 'ease',
        duration: 0.5,
    });
}

export function elevateAnimationObserver(
    target: Element,
    elevation: number | string = -10,
): IntersectionObserver {
    const tl = gsap.timeline();
    tl.add(levelUpAnimation(target, elevation));
    const observer = createElevateObserver(tl);
    observer.observe(target.parentElement as HTMLElement);
    return observer;
}


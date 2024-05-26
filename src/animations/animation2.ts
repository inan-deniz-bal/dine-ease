import { AnimationController } from '@ionic/angular';

export const slideInFromRightAnimation = (baseEl: HTMLElement) => {
  const animationCtrl = new AnimationController();
  const ionPageElement = baseEl.querySelector('.ion-page');

  if (!ionPageElement) {
    throw new Error('Ion page element not found');
  }

  const rootAnimation = animationCtrl.create()
    .addElement(ionPageElement)
    .duration(500)
    .easing('ease-in-out')
    .fromTo('transform', 'translateX(100%)', 'translateX(0%)')
    .fromTo('opacity', 1, 1);

  return rootAnimation;
};

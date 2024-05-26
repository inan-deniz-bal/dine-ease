import { AnimationController } from '@ionic/angular';

export const slideOutToRightAnimation = (baseEl: HTMLElement) => {
  const animationCtrl = new AnimationController();
  const ionPageElement = baseEl.querySelector('.ion-page');

  if (!ionPageElement) {
    throw new Error('Ion page element not found');
  }

  const rootAnimation = animationCtrl.create()
    .addElement(ionPageElement)
    .duration(500)
    .easing('ease-in-out')
    .fromTo('transform', 'translateX(0%)', 'translateX(100%)')
    .fromTo('opacity', 1, 1);

  return rootAnimation;
};

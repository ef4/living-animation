import { Motion, rAF } from 'ember-animated';

export default function drag(sprite, opts) {
  return new Drag(sprite, opts).run();
}

class Drag extends Motion {
  constructor(sprite, opts) {
    super(sprite, opts);
    this.prior = null;

    // This is our own sprite's absolute screen position that
    // corresponds to the real start of dragging (which may span many
    // Drag instances, because of interruption)
    this.dragStartX = null;
    this.dragStartY = null;
  }

  interrupted(motions) {
    this.prior = motions.find(m => m instanceof this.constructor);
  }


  *animate() {
    let sprite = this.sprite;

    let initialTx, initialTy;
    if (this.prior) {
      this.dragStartX = this.prior.dragStartX;
      this.dragStartY = this.prior.dragStartY;
      initialTx = sprite.transform.tx - sprite.absoluteInitialBounds.left + this.dragStartX;
      initialTy = sprite.transform.ty - sprite.absoluteInitialBounds.top + this.dragStartY;
    } else {
      this.dragStartX = sprite.absoluteInitialBounds.left;
      this.dragStartY = sprite.absoluteInitialBounds.top;
      initialTx = sprite.transform.tx;
      initialTy = sprite.transform.ty;
    }

    // targets are all in absolute screen coordinates
    let targets = this._findTargets();
    let ownTarget = centerPoint(sprite.absoluteFinalBounds);

    sprite.applyStyles({
      zIndex: 1
    });

    while (sprite.owner.value.dragState) {
      let dragState = sprite.owner.value.dragState;

      // these track relative motion since the drag started
      let dx = dragState.latestPointerX - dragState.initialPointerX;
      let dy = dragState.latestPointerY - dragState.initialPointerY;

      // adjust our transform to match the latest relative mouse motion
      sprite.translate(
        dx + initialTx - sprite.transform.tx,
        dy + initialTy - sprite.transform.ty
      );

      // now this is our own absolute center position
      let x = dx + this.dragStartX + sprite.absoluteFinalBounds.width / 2;
      let y = dy + this.dragStartY + sprite.absoluteFinalBounds.height / 2;

      let ownDistance = (x - ownTarget.x) * (x - ownTarget.x) + (y - ownTarget.y) * (y - ownTarget.y);
      let closerTarget = targets.find(target => {
        let partialX = target.x - x;
        let partialY = target.y - y;
        let distance = partialX * partialX + partialY * partialY;
        return distance < ownDistance;
      });

      if (closerTarget) {
        this.opts.onCollision(closerTarget.sprite);
      }

      yield rAF();
    }

  }

  _findTargets() {
    return this.opts.others.map(otherSprite => {
      let center = centerPoint(otherSprite.absoluteFinalBounds);
      return {
        x: center.x,
        y: center.y,
        sprite: otherSprite
      };
    });
  }
}



function centerPoint(bounds) {
  return {
    x: bounds.left + bounds.width / 2,
    y: bounds.top + bounds.height / 2
  };
}

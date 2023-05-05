import React from 'react';
import Link from 'next/link';
import { Action } from "../typescript/action";

type AdditionalParam = {
    title_h3: string;
    description: string;
  }
  
type Card = {
    title_h3: string;
    description: string;
    call_to_action: Action;
    $: AdditionalParam;
  }
  
type CardProps = {
    cards: [Card]
  }

export default function CardSection({ cards }: CardProps) {
  return (
    <div className='demo-section'>
      {cards?.map((card, index) => (
        <div className='cards' key={index}>
          {card.title_h3 && <h3 {...card.$?.title_h3 as {}}>{card.title_h3}</h3>}
          {card.description && <p {...card.$?.description as {}}>{card.description}</p>}
          <div className='card-cta'>
            {card.call_to_action.title && card.call_to_action.href && (
              <Link href={card.call_to_action.href}>
                <a className='btn primary-btn'>{card.call_to_action.title}</a>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

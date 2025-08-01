"use client";

import React from 'react';
import { TwoColumnTextSection as TwoColumnTextSectionType } from '@/app/custom_pages/types/sections';
import { Section } from '@/app/custom_pages/types/sections';

interface TwoColumnTextSectionProps {
  section: TwoColumnTextSectionType;
  isEditMode: boolean;
  onSectionChangeAction: (section: Section) => void;
  speakText?: (text: string) => void;
}

export const TwoColumnTextSection: React.FC<TwoColumnTextSectionProps> = ({
  section,
  isEditMode,
  onSectionChangeAction: onSectionChange,
  speakText
}) => {
  const handleTextChange = (field: 'leftColumn' | 'rightColumn', value: string) => {
    if (!isEditMode) return;
    onSectionChange({
      ...section,
      [field]: value
    });
  };

  const renderTextWithFormatting = (text: string, isLeft: boolean) => {
    const textStyle = isLeft ? {
      fontStyle: section.leftFontStyle,
      color: section.leftFontColor,
      fontSize: section.leftFontSize,
      textShadow: section.leftTextShadow ? 
        `${section.leftTextShadow.offsetX} ${section.leftTextShadow.offsetY} ${section.leftTextShadow.blur} ${section.leftTextShadow.color}` : 'none',
      WebkitTextStroke: section.leftTextOutline ? 
        `${section.leftTextOutline.width} ${section.leftTextOutline.color}` : 'none',
      padding: section.leftTextBackground?.padding || '0',
      backgroundColor: section.leftTextBackground ? 
        `rgba(${hexToRgba(section.leftTextBackground.color, section.leftTextBackground.opacity || 1)})` : 'transparent',
      backdropFilter: section.leftTextBackground?.blur ? `blur(${section.leftTextBackground.blur})` : 'none',
      borderRadius: section.leftTextBackground?.borderRadius || '0'
    } : {
      fontStyle: section.rightFontStyle,
      color: section.rightFontColor,
      fontSize: section.rightFontSize,
      textShadow: section.rightTextShadow ? 
        `${section.rightTextShadow.offsetX} ${section.rightTextShadow.offsetY} ${section.rightTextShadow.blur} ${section.rightTextShadow.color}` : 'none',
      WebkitTextStroke: section.rightTextOutline ? 
        `${section.rightTextOutline.width} ${section.rightTextOutline.color}` : 'none',
      padding: section.rightTextBackground?.padding || '0',
      backgroundColor: section.rightTextBackground ? 
        `rgba(${hexToRgba(section.rightTextBackground.color, section.rightTextBackground.opacity || 1)})` : 'transparent',
      backdropFilter: section.rightTextBackground?.blur ? `blur(${section.rightTextBackground.blur})` : 'none',
      borderRadius: section.rightTextBackground?.borderRadius || '0'
    };

    if (isEditMode) {
      return (
        <div className="relative">
          <div
            contentEditable={isEditMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleTextChange(isLeft ? 'leftColumn' : 'rightColumn', e.currentTarget.textContent || '')}
            className={`outline-none min-h-[100px] p-2 ${isEditMode ? 'hover:bg-gray-50 rounded' : ''}`}
            style={textStyle}
            dangerouslySetInnerHTML={{ __html: text }}
          />
          {isEditMode && speakText && (
            <button 
              onClick={() => speakText(text)}
              className="absolute top-2 right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
              title="Speak text"
              type="button"
            >
              🔊
            </button>
          )}
        </div>
      );
    }

    return (
      <div 
        className="prose max-w-none"
        style={textStyle}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  };

  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number = 1): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}, ${alpha}`;
  };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {renderTextWithFormatting(section.leftColumn, true)}
          </div>
          <div className="space-y-4">
            {renderTextWithFormatting(section.rightColumn, false)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnTextSection;

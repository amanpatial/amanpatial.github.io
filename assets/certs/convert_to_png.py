#!/usr/bin/env python3
"""
Convert SVG certification logos to PNG format.
Requires: pip install cairosvg pillow
"""

import os
import sys

try:
    import cairosvg
except ImportError:
    print("Error: cairosvg not found. Install with: pip install cairosvg")
    sys.exit(1)

def convert_svg_to_png(svg_path, png_path, width=240, height=96):
    """Convert SVG to PNG"""
    try:
        cairosvg.svg2png(
            url=svg_path,
            write_to=png_path,
            output_width=width,
            output_height=height
        )
        print(f"✓ Converted {svg_path} -> {png_path}")
        return True
    except Exception as e:
        print(f"✗ Error converting {svg_path}: {e}")
        return False

if __name__ == "__main__":
    certs_dir = os.path.dirname(os.path.abspath(__file__))
    
    conversions = [
        ("togaf.svg", "togaf.png", 240, 96),
        ("aws.svg", "aws.png", 240, 96),
        ("microsoft-ai.svg", "microsoft-ai.png", 240, 96),
    ]
    
    print("Converting SVG logos to PNG...")
    print("-" * 50)
    
    for svg_file, png_file, width, height in conversions:
        svg_path = os.path.join(certs_dir, svg_file)
        png_path = os.path.join(certs_dir, png_file)
        
        if os.path.exists(svg_path):
            convert_svg_to_png(svg_path, png_path, width, height)
        else:
            print(f"✗ {svg_file} not found")
    
    print("-" * 50)
    print("Conversion complete!")

# Certification Logos

This directory contains logos for certification issuers. The HTML is configured to prefer PNG/JPG files and fallback to SVG files.

## Current Certifications

1. **TOGAF 10 Enterprise Architecture Practitioner** - The Open Group
2. **AWS Cloud Solution Architect Associate** - Amazon Web Services  
3. **Agentic AI Fundamentals** - Microsoft

## Official Logo Sources

### The Open Group / TOGAF
- **Official Website**: https://www.opengroup.org/
- **Logo Access**: Contact The Open Group directly for official logo assets
- **Brand Guidelines**: Check their website for brand usage guidelines
- **File needed**: `togaf.png` (transparent background preferred)

### AWS
- **Official Website**: https://aws.amazon.com/
- **AWS Partner Branding**: https://aws.amazon.com/partners/branding/
- **AWS Certifications Badge**: Available through AWS Partner Central (login required)
- **Brand Assets**: https://aws.amazon.com/architecture/icons/
- **File needed**: `aws.png` (look for "AWS Certified" badge)

### Microsoft
- **Official Website**: https://www.microsoft.com/
- **Microsoft Brand Portal**: https://microsoftbc.brand-portal.adobe.com/ (requires access)
- **Partner Marketing Center**: https://partner.microsoft.com/en-us/marketing-center/brand-assets
- **Trademark Guidelines**: https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks
- **File needed**: `microsoft-ai.png` (Microsoft 4-square logo or Microsoft Learn badge)

## Current Setup

The HTML files are configured to:
1. First try to load PNG/JPG files (`togaf.png`, `aws.png`, `microsoft-ai.png`)
2. Fallback to SVG files if PNG/JPG are not found

## Converting SVG to PNG

### Quick Conversion (Python Script)
A conversion script is provided. Run:
```bash
cd assets/certs
pip install cairosvg
python3 convert_to_png.py
```

This will create PNG files (240x96px) from the SVG files.

### Using Online Tools
- **CloudConvert**: https://cloudconvert.com/svg-to-png
- **Convertio**: https://convertio.co/svg-png/
- **SVG2PNG**: https://svgtopng.com/
- Recommended size: 240x96px (2x for retina displays)

### Using Command Line Tools

**ImageMagick:**
```bash
convert -background none -density 300 assets/certs/aws.svg assets/certs/aws.png
convert -background none -density 300 assets/certs/togaf.svg assets/certs/togaf.png
convert -background none -density 300 assets/certs/microsoft-ai.svg assets/certs/microsoft-ai.png
```

**Inkscape:**
```bash
inkscape --export-type=png --export-filename=aws.png --export-width=240 aws.svg
inkscape --export-type=png --export-filename=togaf.png --export-width=240 togaf.svg
inkscape --export-type=png --export-filename=microsoft-ai.png --export-width=240 microsoft-ai.svg
```

## Image Specifications

- **Format**: PNG with transparent background (preferred) or JPG
- **Minimum Size**: 120px width × 48px height
- **Recommended**: 240px width × 96px height (for retina displays)
- **Aspect Ratio**: Maintain original logo proportions
- **Background**: Transparent PNG preferred

## Notes

- The SVG files provided are high-quality representations that closely match official designs
- For official use, always obtain logos from the official sources listed above
- Ensure compliance with each organization's brand guidelines and trademark policies

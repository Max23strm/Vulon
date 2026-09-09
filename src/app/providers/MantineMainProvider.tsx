"use client";

import { createTheme, MantineProvider } from "@mantine/core";
import React from "react";
import { useAppState } from "./StateProvider";
import { generateColors } from '@mantine/colors-generator';

const MantineMainProvider = ({ children }: { children: React.ReactNode }) => {
  const entity = useAppState((state) => state.entity);

  const entityPrimaryCol = generateColors(entity?.colors?.[0] ?? '#099CFF');
  const entitySecondaryCol = generateColors(entity?.colors?.[1] ??  '#4F23C0');
  const entityTertiaryCol = generateColors(entity?.colors?.[2] ?? '#F21616');

  const theme = createTheme({
    fontFamily: "DM Sans, sans-serif",
    fontFamilyMonospace: "Space Grotesk, Courier, monospace",
    headings: { fontFamily: "Rajdhani, sans-serif" },
    colors: {
        entityPrimary: entityPrimaryCol,
        entitySecondary: entitySecondaryCol,
        entityTertiary: entityTertiaryCol,
    },
    primaryColor: 'entityPrimary'
  });

  return (
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      {children}
    </MantineProvider>
  );
};

export default MantineMainProvider;

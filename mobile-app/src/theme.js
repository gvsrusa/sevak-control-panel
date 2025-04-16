export const colors = {
    primary: '#4CAF50',
    secondary: '#2196F3',
    background: '#f5f5f5',
    surface: '#ffffff',
    error: '#f44336',
    text: {
        primary: '#333333',
        secondary: '#666666',
        light: '#ffffff'
    }
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
};

export const typography = {
    h1: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    h2: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    body: {
        fontSize: 16
    },
    caption: {
        fontSize: 14,
        color: colors.text.secondary
    }
};

export const shadows = {
    small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5
    }
};

export const components = {
    button: {
        primary: {
            backgroundColor: colors.primary,
            padding: spacing.md,
            borderRadius: 8,
            alignItems: 'center'
        },
        secondary: {
            backgroundColor: colors.secondary,
            padding: spacing.md,
            borderRadius: 8,
            alignItems: 'center'
        }
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 8,
        padding: spacing.md,
        marginBottom: spacing.md,
        ...shadows.small
    }
}; 
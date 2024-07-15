import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps } from "react"

type CommonProps = {
    variant: 'solid' | 'outlined' | 'ghost'
}
type OGLinkProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
type OGButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type CommonAttributes = Pick<OGLinkProps | OGButtonProps, keyof OGLinkProps & keyof OGButtonProps>;
type UniqueLinkProps = Omit<OGLinkProps, keyof CommonAttributes>
type UniqueButtonProps = Omit<OGButtonProps, keyof CommonAttributes>

type ThrowTypeErrorWhenUsedAsProps<Type> = {
    [Property in keyof Type]?: never;
};

type LinkProps = OGLinkProps & ThrowTypeErrorWhenUsedAsProps<UniqueButtonProps>
type ButtonProps = OGButtonProps & ThrowTypeErrorWhenUsedAsProps<UniqueLinkProps>
type ComponentProps = CommonProps & (LinkProps | ButtonProps) & React.PropsWithChildren

const isLink = (el: LinkProps | ButtonProps): el is LinkProps => {
    return (el as LinkProps).href !== undefined;
}

const FirstComponent = ({ variant, ...props }: ComponentProps) => {
    if (isLink(props)) {
        const { href, children, ...rest } = props
        return <a href={href} {...rest}>{`I am a ${variant} link`}</a>
    } else {
        const { children, ...rest } = props
        return (<button {...rest}>
            {children}
            I am a button {`${variant}`}
        </button>)
    }
}

export default FirstComponent
